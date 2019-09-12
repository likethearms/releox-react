# Releox react
## Table of Content
- [LoginScene](#loginscene)
- [Coreui Layout](#coreui-layout)

## LoginScene
LoginScene
```js
<LoginScene>
  ...
<LoginScene>
```
LoginScene with title block
```js
<LoginScene titleBlock={<h1>Custom title</h1>}>
  ...
<LoginScene>
```
- `onSubmit` - (body: LoginBody) => Promise<void>; - Default behavior - Logs user in through API, saves user and token and sets redirect state to the wanted page
- `onError` - (err: Error) => void; - Default behavior - Sets error message to the state
- `locale` - ReleoxLocale; Default `fi` - Sets translations of the page
- `titleBlock` - String | JSX.Element; Default `undefined` - Sets custom title to the screen


## Coreui Layout
Coreui layout
```js
<CoreuiLayout brand="MAINIO" menuTitle={user.name} sidebarMenu={sidebarMenu}>
  ...
<CoreuiLayout>
```
Coreui layout with custom element
```js
const CustomComponent = () => <h1>Foo</h1>

<CoreuiLayout brand={CustomComponent} menuTitle={user.name} sidebarMenu={sidebarMenu}>
  ...
<CoreuiLayout>
```
### CoreuiLayout props
- `children` - JSX.Element | String, Required - Layout's main content
- `brand` - String | JSX.Element, Required - Header brand text or element
- `sidebarMenu` - CoreuiSidebarMenu[], Required - Sidebar menu
- `brandUrl` - String, Default: `'/'` - Header brand text or element
- `headerRightText` - String, Default: `''` - Text in right side of CoreuiHeader
