export type SidebarEntry = {
  label : string
  path : string
  icon : JSX.Element
  render : () => JSX.Element
  children : SidebarEntry[]
}
