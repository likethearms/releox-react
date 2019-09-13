# Releox react
## Table of Content
- [DataTable](#datatable)
- [LoginScene](#loginscene)
- [Coreui Layout](#coreui-layout)

## DataTable
### DataTable props
- `totalSize` - Number, **Required** - Data total size
- `data` - any[], **Required** - Data to show
- `columns` - DataTableColumn[], **Required** - Columns to show
- `defaultSorted` - DataTableDefaultSort, **Required** - Remote sort when component render
- `keyField` - String, Default: `'id'` - key field for mapped data
- `hover` - Boolean, Default: `true` - Add hover effect to table
- `striped` - Boolean, Default: `true` - Add stripes to table
- `noDataText` - String, Default: `'There is nothing to show'` - Text which is visible when data is empty array.
- `overlayElement` - () => JSX.Element, Default: OverlayLoading - Element which is visible when loading prop is true
- `loading` - Boolean, Default: `false` - Show loading indicator
- `bordered` - Boolean, Default: `false` - Add borders to table
- `onClick` - (event: String, row: RowObject) => void, Default: `undefined` - event is called when user click the table row
- `rowClasses` - String, Default: `undefined` - classes that are added to table's row
- `onChangeLoopback` - (config: DataTableLoopbackFilter) => void, Default: `undefined` - Loopback specific Table on change event. It use loopback query format by default
- `query` - any, Default: `undefined` - Query is added to every onTableChange events

## LoginScene
### LoginScene props
- `onSubmit` - (body: LoginBody) => Promise<void>; - Default behavior - Logs user in through API, saves user and token and sets redirect state to the wanted page
- `onError` - (err: Error) => void; - Default behavior - Sets error message to the state
- `locale` - ReleoxLocale; Default `fi` - Sets translations of the page
- `titleBlock` - String | JSX.Element; Default `undefined` - Sets custom title to the screen

## Coreui Layout
### CoreuiLayout props
- `children` - JSX.Element | String, **Required** - Layout's main content
- `brand` - String | JSX.Element, **Required** - Header brand text or element
- `sidebarMenu` - CoreuiSidebarMenu[], Required - Sidebar menu
- `brandUrl` - String, Default: `'/'` - Header brand text or element
- `headerRightText` - String, Default: `''` - Text in right side of CoreuiHeader
