export type RemoteAction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'ENTER' | 'BACK' | 'UNKNOWN'

/**
 * Normalizes a KeyboardEvent from any input source (arrow keys, Smart TV colored
 * buttons, legacy keyCode) into a single RemoteAction that the rest of the app
 * consumes. All key-to-action mapping lives here and nowhere else.
 *
 * Colored button mapping (VIDAA / HbbTV convention):
 *   Red    (ColorF0Red / 403) → LEFT
 *   Green  (ColorF1Green / 404) → UP
 *   Yellow (ColorF2Yellow / 405) → DOWN
 *   Blue   (ColorF3Blue / 406) → RIGHT
 */
export function normalizeRemoteKey(e: KeyboardEvent): RemoteAction {
  // Modern browsers: check event.key first
  switch (e.key) {
    case 'ArrowLeft':
    case 'ColorF0Red':
      return 'LEFT'
    case 'ArrowRight':
    case 'ColorF3Blue':
      return 'RIGHT'
    case 'ArrowUp':
    case 'ColorF1Green':
      return 'UP'
    case 'ArrowDown':
    case 'ColorF2Yellow':
      return 'DOWN'
    case 'Enter':
      return 'ENTER'
    case 'Escape':
    case 'Backspace':
      return 'BACK'
  }

  // Legacy fallback: keyCode for older Smart TV browsers that do not set e.key
  switch (e.keyCode) {
    case 37:  // ArrowLeft
    case 403: // Red
      return 'LEFT'
    case 39:  // ArrowRight
    case 406: // Blue
      return 'RIGHT'
    case 38:  // ArrowUp
    case 404: // Green
      return 'UP'
    case 40:  // ArrowDown
    case 405: // Yellow
      return 'DOWN'
    case 13:  // Enter
      return 'ENTER'
    case 8:   // Backspace
    case 27:  // Escape
    case 461: // Back button (Samsung Tizen / LG webOS)
      return 'BACK'
  }

  return 'UNKNOWN'
}
