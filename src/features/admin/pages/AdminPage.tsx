import { useState } from 'react'
import type { Prayer, PrayerCategory } from '@/features/prayer/types'
import type { Dua, DuaCategory } from '@/features/dua/types'
import type { TpaMaterial, MaterialCategory } from '@/features/tpa/types'
import defaultPrayers from '@/features/prayer/data/prayers.json'
import defaultDuas from '@/features/dua/data/duas.json'
import defaultMaterials from '@/features/tpa/data/materials.json'

// ─── helpers ──────────────────────────────────────────────────────────────────

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
}

function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function loadStored<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : fallback
  } catch {
    return fallback
  }
}

function saveStored<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

// ─── shared field component ────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-400 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:border-green-500'

const areaCls = inputCls + ' resize-y'

const selectCls = inputCls

// ─── Prayer tab ───────────────────────────────────────────────────────────────

const PRAYER_CATEGORIES: PrayerCategory[] = ['wajib', 'sunnah']

type PrayerForm = Omit<Prayer, 'id'>

const emptyPrayer: PrayerForm = {
  title: '',
  category: 'wajib',
  arabicText: '',
  latinText: '',
  translation: '',
}

function PrayerTab({
  prayers,
  onChange,
}: {
  prayers: Prayer[]
  onChange: (updated: Prayer[]) => void
}) {
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Prayer | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState<PrayerForm>(emptyPrayer)
  const [errors, setErrors] = useState<Partial<PrayerForm>>({})

  const filtered = prayers.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  function validate(): boolean {
    const e: Partial<PrayerForm> = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi'
    if (!form.arabicText.trim()) e.arabicText = 'Teks Arab wajib diisi'
    if (!form.latinText.trim()) e.latinText = 'Latin wajib diisi'
    if (!form.translation.trim()) e.translation = 'Terjemahan wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleEdit(prayer: Prayer) {
    setEditing(prayer)
    setIsAdding(false)
    setForm({
      title: prayer.title,
      category: prayer.category,
      arabicText: prayer.arabicText,
      latinText: prayer.latinText,
      translation: prayer.translation,
    })
    setErrors({})
  }

  function handleAdd() {
    setIsAdding(true)
    setEditing(null)
    setForm(emptyPrayer)
    setErrors({})
  }

  function handleSave() {
    if (!validate()) return
    if (editing) {
      onChange(prayers.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)))
    } else {
      onChange([...prayers, { id: generateId(), ...form }])
    }
    setEditing(null)
    setIsAdding(false)
  }

  function handleDelete(id: string) {
    if (!window.confirm('Hapus bacaan ini?')) return
    onChange(prayers.filter((p) => p.id !== id))
  }

  const showForm = editing !== null || isAdding

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Cari bacaan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + ' flex-1'}
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
        >
          + Tambah
        </button>
        <button
          onClick={() => downloadJson(prayers, 'prayers.json')}
          className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
        >
          Ekspor JSON
        </button>
      </div>

      {showForm && (
        <div className="border border-neutral-700 rounded p-4 space-y-3 bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-200">
            {editing ? `Edit: ${editing.title}` : 'Tambah Bacaan Baru'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Judul" required>
              <input
                className={inputCls}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <span className="text-xs text-red-400">{errors.title}</span>}
            </Field>
            <Field label="Kategori">
              <select
                className={selectCls}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as PrayerCategory })}
              >
                {PRAYER_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c === 'wajib' ? 'Wajib' : 'Sunnah'}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Teks Arab" required>
            <textarea
              className={areaCls}
              rows={3}
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm({ ...form, arabicText: e.target.value })}
            />
            {errors.arabicText && <span className="text-xs text-red-400">{errors.arabicText}</span>}
          </Field>
          <Field label="Latin" required>
            <textarea
              className={areaCls}
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm({ ...form, latinText: e.target.value })}
            />
            {errors.latinText && <span className="text-xs text-red-400">{errors.latinText}</span>}
          </Field>
          <Field label="Terjemahan" required>
            <textarea
              className={areaCls}
              rows={2}
              value={form.translation}
              onChange={(e) => setForm({ ...form, translation: e.target.value })}
            />
            {errors.translation && (
              <span className="text-xs text-red-400">{errors.translation}</span>
            )}
          </Field>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setEditing(null)
                setIsAdding(false)
              }}
              className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-700 text-left">
            <th className="py-2 pr-4 text-neutral-400 font-medium">Judul</th>
            <th className="py-2 pr-4 text-neutral-400 font-medium w-24">Kategori</th>
            <th className="py-2 text-neutral-400 font-medium text-right w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((prayer) => (
            <tr key={prayer.id} className="border-b border-neutral-800">
              <td className="py-2 pr-4 text-neutral-100">{prayer.title}</td>
              <td className="py-2 pr-4 text-neutral-400 capitalize">{prayer.category}</td>
              <td className="py-2 text-right space-x-3">
                <button
                  onClick={() => handleEdit(prayer)}
                  className="text-green-500 hover:text-green-400 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prayer.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-neutral-500 text-sm">
                Tidak ada hasil
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Dua tab ──────────────────────────────────────────────────────────────────

const DUA_CATEGORIES: DuaCategory[] = [
  'makan',
  'tidur',
  'rumah',
  'kamar-mandi',
  'kendaraan',
  'masjid',
  'ibadah',
]

const DUA_CATEGORY_LABELS: Record<DuaCategory, string> = {
  makan: 'Makan',
  tidur: 'Tidur',
  rumah: 'Rumah',
  'kamar-mandi': 'Kamar Mandi',
  kendaraan: 'Kendaraan',
  masjid: 'Masjid',
  ibadah: 'Ibadah',
}

type DuaForm = Omit<Dua, 'id'>

const emptyDua: DuaForm = {
  title: '',
  arabicText: '',
  latinText: '',
  translation: '',
  category: 'ibadah',
}

function DuaTab({ duas, onChange }: { duas: Dua[]; onChange: (updated: Dua[]) => void }) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<DuaCategory | ''>('')
  const [editing, setEditing] = useState<Dua | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState<DuaForm>(emptyDua)
  const [errors, setErrors] = useState<Partial<DuaForm>>({})

  const filtered = duas.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === '' || d.category === categoryFilter
    return matchSearch && matchCat
  })

  function validate(): boolean {
    const e: Partial<DuaForm> = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi'
    if (!form.arabicText.trim()) e.arabicText = 'Teks Arab wajib diisi'
    if (!form.latinText.trim()) e.latinText = 'Latin wajib diisi'
    if (!form.translation.trim()) e.translation = 'Terjemahan wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleEdit(dua: Dua) {
    setEditing(dua)
    setIsAdding(false)
    setForm({
      title: dua.title,
      arabicText: dua.arabicText,
      latinText: dua.latinText,
      translation: dua.translation,
      category: dua.category,
    })
    setErrors({})
  }

  function handleAdd() {
    setIsAdding(true)
    setEditing(null)
    setForm(emptyDua)
    setErrors({})
  }

  function handleSave() {
    if (!validate()) return
    if (editing) {
      onChange(duas.map((d) => (d.id === editing.id ? { ...editing, ...form } : d)))
    } else {
      onChange([...duas, { id: generateId(), ...form }])
    }
    setEditing(null)
    setIsAdding(false)
  }

  function handleDelete(id: string) {
    if (!window.confirm('Hapus doa ini?')) return
    onChange(duas.filter((d) => d.id !== id))
  }

  const showForm = editing !== null || isAdding

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Cari doa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + ' flex-1'}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as DuaCategory | '')}
          className={selectCls + ' w-40'}
        >
          <option value="">Semua Kategori</option>
          {DUA_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {DUA_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
        >
          + Tambah
        </button>
        <button
          onClick={() => downloadJson(duas, 'duas.json')}
          className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
        >
          Ekspor JSON
        </button>
      </div>

      {showForm && (
        <div className="border border-neutral-700 rounded p-4 space-y-3 bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-200">
            {editing ? `Edit: ${editing.title}` : 'Tambah Doa Baru'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Judul" required>
              <input
                className={inputCls}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <span className="text-xs text-red-400">{errors.title}</span>}
            </Field>
            <Field label="Kategori">
              <select
                className={selectCls}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as DuaCategory })}
              >
                {DUA_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {DUA_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Teks Arab" required>
            <textarea
              className={areaCls}
              rows={3}
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm({ ...form, arabicText: e.target.value })}
            />
            {errors.arabicText && <span className="text-xs text-red-400">{errors.arabicText}</span>}
          </Field>
          <Field label="Latin" required>
            <textarea
              className={areaCls}
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm({ ...form, latinText: e.target.value })}
            />
            {errors.latinText && <span className="text-xs text-red-400">{errors.latinText}</span>}
          </Field>
          <Field label="Terjemahan" required>
            <textarea
              className={areaCls}
              rows={2}
              value={form.translation}
              onChange={(e) => setForm({ ...form, translation: e.target.value })}
            />
            {errors.translation && (
              <span className="text-xs text-red-400">{errors.translation}</span>
            )}
          </Field>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setEditing(null)
                setIsAdding(false)
              }}
              className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-700 text-left">
            <th className="py-2 pr-4 text-neutral-400 font-medium">Judul</th>
            <th className="py-2 pr-4 text-neutral-400 font-medium w-32">Kategori</th>
            <th className="py-2 text-neutral-400 font-medium text-right w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((dua) => (
            <tr key={dua.id} className="border-b border-neutral-800">
              <td className="py-2 pr-4 text-neutral-100">{dua.title}</td>
              <td className="py-2 pr-4 text-neutral-400">
                {DUA_CATEGORY_LABELS[dua.category] ?? dua.category}
              </td>
              <td className="py-2 text-right space-x-3">
                <button
                  onClick={() => handleEdit(dua)}
                  className="text-green-500 hover:text-green-400 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dua.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-neutral-500 text-sm">
                Tidak ada hasil
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Material tab ─────────────────────────────────────────────────────────────

const MATERIAL_CATEGORIES: MaterialCategory[] = ['hafalan', 'fiqh', 'akidah', 'akhlak', 'tahsin']

const MATERIAL_CATEGORY_LABELS: Record<MaterialCategory, string> = {
  hafalan: 'Hafalan',
  fiqh: 'Fiqh',
  akidah: 'Akidah',
  akhlak: 'Akhlak',
  tahsin: 'Tahsin',
}

type MaterialForm = Omit<TpaMaterial, 'id'>

const emptyMaterial: MaterialForm = {
  title: '',
  category: 'hafalan',
  arabicText: '',
  latinText: '',
  translation: '',
  content: '',
}

function MaterialTab({
  materials,
  onChange,
}: {
  materials: TpaMaterial[]
  onChange: (updated: TpaMaterial[]) => void
}) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<MaterialCategory | ''>('')
  const [editing, setEditing] = useState<TpaMaterial | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form, setForm] = useState<MaterialForm>(emptyMaterial)
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  const filtered = materials.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === '' || m.category === categoryFilter
    return matchSearch && matchCat
  })

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.title.trim()) e.title = 'Judul wajib diisi'
    const hasArabic = form.arabicText?.trim()
    const hasContent = form.content?.trim()
    if (!hasArabic && !hasContent) {
      e.content = 'Isi salah satu: Teks Arab atau Konten Teks'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleEdit(m: TpaMaterial) {
    setEditing(m)
    setIsAdding(false)
    setForm({
      title: m.title,
      category: m.category,
      arabicText: m.arabicText ?? '',
      latinText: m.latinText ?? '',
      translation: m.translation ?? '',
      content: m.content ?? '',
    })
    setErrors({})
  }

  function handleAdd() {
    setIsAdding(true)
    setEditing(null)
    setForm(emptyMaterial)
    setErrors({})
  }

  function handleSave() {
    if (!validate()) return
    const cleaned: TpaMaterial = {
      id: editing?.id ?? generateId(),
      title: form.title.trim(),
      category: form.category,
      ...(form.arabicText?.trim() && { arabicText: form.arabicText.trim() }),
      ...(form.latinText?.trim() && { latinText: form.latinText.trim() }),
      ...(form.translation?.trim() && { translation: form.translation.trim() }),
      ...(form.content?.trim() && { content: form.content.trim() }),
    }
    if (editing) {
      onChange(materials.map((m) => (m.id === editing.id ? cleaned : m)))
    } else {
      onChange([...materials, cleaned])
    }
    setEditing(null)
    setIsAdding(false)
  }

  function handleDelete(id: string) {
    if (!window.confirm('Hapus materi ini?')) return
    onChange(materials.filter((m) => m.id !== id))
  }

  const showForm = editing !== null || isAdding

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Cari materi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls + ' flex-1'}
        />
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as MaterialCategory | '')
          }
          className={selectCls + ' w-36'}
        >
          <option value="">Semua Kategori</option>
          {MATERIAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {MATERIAL_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
        >
          + Tambah
        </button>
        <button
          onClick={() => downloadJson(materials, 'materials.json')}
          className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
        >
          Ekspor JSON
        </button>
      </div>

      {showForm && (
        <div className="border border-neutral-700 rounded p-4 space-y-3 bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-200">
            {editing ? `Edit: ${editing.title}` : 'Tambah Materi Baru'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Judul" required>
              <input
                className={inputCls}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <span className="text-xs text-red-400">{errors.title}</span>}
            </Field>
            <Field label="Kategori">
              <select
                className={selectCls}
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as MaterialCategory })
                }
              >
                {MATERIAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {MATERIAL_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p className="text-xs text-neutral-500">
            Isi Teks Arab untuk materi hafalan surah/doa. Isi Konten Teks untuk materi fiqh,
            akidah, atau akhlak.
          </p>
          <Field label="Teks Arab (opsional)">
            <textarea
              className={areaCls}
              rows={3}
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm({ ...form, arabicText: e.target.value })}
            />
          </Field>
          <Field label="Latin (opsional)">
            <textarea
              className={areaCls}
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm({ ...form, latinText: e.target.value })}
            />
          </Field>
          <Field label="Terjemahan (opsional)">
            <textarea
              className={areaCls}
              rows={2}
              value={form.translation}
              onChange={(e) => setForm({ ...form, translation: e.target.value })}
            />
          </Field>
          <Field label="Konten Teks (opsional)">
            <textarea
              className={areaCls}
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            {errors.content && <span className="text-xs text-red-400">{errors.content}</span>}
          </Field>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-700 hover:bg-green-600 text-white text-sm rounded"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setEditing(null)
                setIsAdding(false)
              }}
              className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-700 text-left">
            <th className="py-2 pr-4 text-neutral-400 font-medium">Judul</th>
            <th className="py-2 pr-4 text-neutral-400 font-medium w-28">Kategori</th>
            <th className="py-2 text-neutral-400 font-medium text-right w-28">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id} className="border-b border-neutral-800">
              <td className="py-2 pr-4 text-neutral-100">{m.title}</td>
              <td className="py-2 pr-4 text-neutral-400">
                {MATERIAL_CATEGORY_LABELS[m.category] ?? m.category}
              </td>
              <td className="py-2 text-right space-x-3">
                <button
                  onClick={() => handleEdit(m)}
                  className="text-green-500 hover:text-green-400 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-neutral-500 text-sm">
                Tidak ada hasil
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main admin page ───────────────────────────────────────────────────────────

type Tab = 'prayers' | 'duas' | 'materials'

const TAB_LABELS: Record<Tab, string> = {
  prayers: 'Bacaan Shalat',
  duas: 'Doa Harian',
  materials: 'Materi TPA',
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('prayers')

  const [prayers, setPrayers] = useState<Prayer[]>(() =>
    loadStored<Prayer>('admin:prayers', defaultPrayers as Prayer[])
  )
  const [duas, setDuas] = useState<Dua[]>(() =>
    loadStored<Dua>('admin:duas', defaultDuas as Dua[])
  )
  const [materials, setMaterials] = useState<TpaMaterial[]>(() =>
    loadStored<TpaMaterial>('admin:materials', defaultMaterials as TpaMaterial[])
  )

  function handlePrayersChange(updated: Prayer[]) {
    setPrayers(updated)
    saveStored('admin:prayers', updated)
  }

  function handleDuasChange(updated: Dua[]) {
    setDuas(updated)
    saveStored('admin:duas', updated)
  }

  function handleMaterialsChange(updated: TpaMaterial[]) {
    setMaterials(updated)
    saveStored('admin:materials', updated)
  }

  function handleReset() {
    if (!window.confirm('Reset semua data ke default? Perubahan yang belum diekspor akan hilang.'))
      return
    localStorage.removeItem('admin:prayers')
    localStorage.removeItem('admin:duas')
    localStorage.removeItem('admin:materials')
    setPrayers(defaultPrayers as Prayer[])
    setDuas(defaultDuas as Dua[])
    setMaterials(defaultMaterials as TpaMaterial[])
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Al-Kautsar TPA — Manajemen Konten
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-2 border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-neutral-200 text-xs rounded"
          >
            Reset ke Default
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-700 mb-6">
          {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'px-4 py-2 text-sm -mb-px border-b-2 transition-colors',
                activeTab === tab
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200',
              ].join(' ')}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'prayers' && (
          <PrayerTab prayers={prayers} onChange={handlePrayersChange} />
        )}
        {activeTab === 'duas' && (
          <DuaTab duas={duas} onChange={handleDuasChange} />
        )}
        {activeTab === 'materials' && (
          <MaterialTab materials={materials} onChange={handleMaterialsChange} />
        )}
      </div>
    </div>
  )
}
