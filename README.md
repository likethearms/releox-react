# Releox react

## Table of Content

- [AsyncSelectFormik](#asyncSelectFormik)
- [Button](#button)
- [Card](#card)
- [CheckBox](#checkBox)
- [CoreuiCheckBox](#coreuiCheckBox)
- [Coreui Layout](#coreui-layout)
- [DataTable](#datatable)
- [Input](#input)
- [LoginScene](#loginscene)
- [NativeInput](#nativeInput)
- [TextArea](#textArea)

## AsyncSelectFormik

### AsyncSelectFormik props

- `label` - string, **Required** - Label for AsyncSelectFormik
- `name` - string, **Required** - Name for AsyncSelectFormik
- `getUrl` - string, **Required** - URL for data in AsyncSelectFormik
- `queryFormat` - string, **Required** - Queryformat for data in AsyncSelectFormik ('mongodb' | 'postgresql')
- `id` - string, - Default `'undefined'` - Custom id for AsyncSelectFormik
- `inline` - boolean, Default: `false` - Inline label format for AsyncSelectFormik
- `inlineLabelWidth` - number, Default: `4` - Label width for AsyncSelectFormik (MAX = 12)
- `labelClass` - string, Default: `''` - Custom class for label

## Button

## Button props

- `id`: - string, **Required** - Id for button
- `children` - string | JSX.Element **Required** - Children for button
- `type`: - string - Default `'undefined'` - Type of button ('submit' | 'button');
- `onClick` - () => any - Default `'undefined'` - Callback to button's onClick event
- `className` - string - Default `'undefined'` - Custom class for button
- `color` - ButtonColor - Default `'undefined'` - Custom color for button ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link')

## Card

### Card props

- `children` - JSX.Element, **Required** - Card's main content
- `header` - JSX.Element, Default: `undefined` - Header element of card
- `id` - string, Default: `''` - Card's id
- `className` - string, Default: `''` - Custom class for card header
- `setCardBody` - boolean, Default: `true'` - Add card-body class to card body

## CheckBox

### CheckBox props

- `label` - string, **Required** - Label for checkBox
- `name` - string, **Required** - Name for checkBox
- `id` - string, - Default `${name}-input` - Custom id for checkBox
- `labelClass` - string, Default: `'form-check-label'` - Custom class for label
- `inputClass` - string, Default: `'form-check-input'` - Custom class for input
- `onChange` - (event: React.ChangeEvent) => void, Default: `undefined` - onChange function to checkBox

## CoreuiCheckBox

### CoreuiCheckBox props

- `label` - string, **Required** - Label for coreuicheckBox
- `name` - string, **Required** - Name for coreuicheckBox
- `id` - string, - Default `${name}-input` - Custom id for coreuicheckBox

## Coreui Layout

### CoreuiLayout props

- `children` - JSX.Element | string, **Required** - Layout's main content
- `brand` - string | JSX.Element, **Required** - Header brand text or element
- `sidebarMenu` - CoreuiSidebarMenu[], **Required** - Sidebar menu
- `brandUrl` - string, Default: `'/'` - Header brand text or element
- `headerRightText` - string, Default: `''` - Text in right side of CoreuiHeader

## DataTable

### DataTable props

- `totalSize` - Number, **Required** - Data total size
- `data` - any[], **Required** - Data to show
- `columns` - DataTableColumn[], **Required** - Columns to show
- `defaultSorted` - DataTableDefaultSort, **Required** - Remote sort when component render
- `keyField` - string, Default: `'id'` - key field for mapped data
- `hover` - Boolean, Default: `true` - Add hover effect to table
- `striped` - Boolean, Default: `true` - Add stripes to table
- `noDataText` - string, Default: `'There is nothing to show'` - Text which is visible when data is empty array.
- `overlayElement` - () => JSX.Element, Default: OverlayLoading - Element which is visible when loading prop is true
- `loading` - Boolean, Default: `false` - Show loading indicator
- `bordered` - Boolean, Default: `false` - Add borders to table
- `onClick` - (event: string, row: RowObject) => void, Default: `undefined` - event is called when user click the table row
- `rowClasses` - string, Default: `undefined` - classes that are added to table's row
- `onChangeLoopback` - (config: DataTableLoopbackFilter) => void, Default: `undefined` - Loopback specific Table on change event. It use loopback query format by default
- `query` - any, Default: `undefined` - Query is added to every onTableChange events

## Input

### Input props

- `label` - string, **Required** - Label for input
- `name` - string, **Required** - Name for input
- `id` - string, - Default `${name}-input` - Custom id for input
- `inline` - boolean, Default: `false` - Inline label format for input
- `inlineLabelWidth` - number, Default: `4` - Label width for input (MAX = 12)
- `labelClass` - string, Default: `''` - Custom class for label
- `type` - InputTypes, Default: `'text'` - Type of input data ('text' | 'email' | 'password' | 'date' | 'number')
- `placeholder` - string, Default: `label` - Placeholder for input
- `classname` - string, Default: `form-control'` - Custom class for input

## LoginScene

### LoginScene props

- `onSubmit` - (body: LoginBody) => Promise<void>; - Default behavior - Logs user in through API, saves user and token and sets redirect state to the wanted page
- `onError` - (err: Error) => void; - Default behavior - Sets error message to the state
- `locale` - ReleoxLocale; Default `fi` - Sets translations of the page
- `titleBlock` - string | JSX.Element; Default `undefined` - Sets custom title to the screen
- `loginFieldName` - string; Default `'email'` - Change login login to email based login or username based login
- `showForgotPasswordLink` - Boolean; Default `true` - Hide forgot password link from page

## Coreui Layout

### CoreuiLayout props

- `children` - JSX.Element | string, **Required** - Layout's main content
- `brand` - string | JSX.Element, **Required** - Header brand text or element
- `sidebarMenu` - CoreuiSidebarMenu[], **Required** - Sidebar menu
- `brandUrl` - string, Default: `'/'` - Header brand text or element
- `headerRightText` - string, Default: `''` - Text in right side of CoreuiHeader

## Card

### Card props

- `children` - JSX.Element, **Required** - Card's main content
- `header` - JSX.Element, Default: `undefined` - Header element of card
- `id` - string, Default: `''` - Card's id
- `className` - string, Default: `''` - Custom class for card header
- `setCardBody` - boolean, Default: `true'` - Add card-body class to card body

## Create generic index

```typescript
createGenericIndex(title, reduxEntry, listAction, dataTableProps, redirectUrl, createLink);
```

- `title` - string, **required** - Title of the page
- `reduxEntry` - string, **required** - Redux entry key
- `listAction` - function, **required** - List action
- `dataTableProps` - DataTableProps, **required** - DataTable props columns, defaultSorted and query
- `redirectUrl` - string, Default: `undefined` - URL to page you want to open when record clicked. NOTE! require `':id'` params
- `createLink` - string, Default: `undefined` - Link to create page

### NativeInput

### NativeInput props

- `label` - string, **Required** - Label for input
- `name` - string, **Required** - Name for input
- `id` - string, - Default `${name}-input` - Custom id for input
- `inline` - boolean, Default: `false` - Inline label format for input
- `inlineLabelWidth` - number, Default: `4` - Label width for input (MAX = 12)
- `labelClass` - string, Default: `''` - Custom class for label
- `type` - InputTypes, Default: `'text'` - Type of input data ('text' | 'email' | 'password' | 'date' | 'number')
- `placeholder` - string, Default: `label` - Placeholder for input
- `classname` - string, Default: `form-control'` - Custom class for input

## NativeTextArea

### NativeTextArea props

- `label` - string, **Required** - Label for textArea
- `name` - string, **Required** - Name for textArea
- `id` - string, - Default `${name}-input` - Custom id for textArea
- `inline` - boolean, Default: `false` - Inline label format for textArea
- `inlineLabelWidth` - number, Default: `4` - Label width for textArea (MAX = 12)
- `labelClass` - string, Default: `''` - Custom class for label
- `rows` - number, Default: `6` - Length of rows in textArea
- `placeholder` - string, Default: `label` - Placeholder for textArea
- `classname` - string, Default: `form-control'` - Custom class for textArea

## TextArea

### TextArea props

- `label` - string, **Required** - Label for textArea
- `name` - string, **Required** - Name for textArea
- `id` - string, - Default `${name}-input` - Custom id for textArea
- `inline` - boolean, Default: `false` - Inline label format for textArea
- `inlineLabelWidth` - number, Default: `4` - Label width for textArea (MAX = 12)
- `labelClass` - string, Default: `''` - Custom class for label
- `rows` - number, Default: `6` - Length of rows in textArea
- `placeholder` - string, Default: `label` - Placeholder for textArea
- `classname` - string, Default: `form-control'` - Custom class for textArea
