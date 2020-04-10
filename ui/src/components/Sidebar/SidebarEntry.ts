export type SidebarEntry = {
  key : string
  label : string
  path : string
  icon : JSX.Element
  render : () => JSX.Element
  children : SidebarEntry[]
}
