import path from 'path'

export function getPathToView(endPath: string) {
   return path.resolve('public', endPath)
}
