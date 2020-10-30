export type SidebarEntry = {
  label : string
  path : string
  icon : JSX.Element
  render : () => JSX.Element
  children : SidebarEntry[]
}

export const getChildren = (e : SidebarEntry) : SidebarEntry[] => {
  return e.children.concat(e.children.flatMap(c => getChildren(c)));
}
