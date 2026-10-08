# my-component

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                              | Default     |
| ---------- | ---------- | ----------- | --------------------------------- | ----------- |
| `disabled` | `disabled` |             | `boolean`                         | `false`     |
| `icon`     | `icon`     |             | `string`                          | `undefined` |
| `text`     | `text`     |             | `string`                          | `undefined` |
| `type`     | `type`     |             | `"button" \| "reset" \| "submit"` | `'button'`  |
| `variant`  | `variant`  |             | `"primary" \| "secondary"`        | `'primary'` |


## Events

| Event      | Description | Type                |
| ---------- | ----------- | ------------------- |
| `vgrClick` |             | `CustomEvent<void>` |


## Dependencies

### Depends on

- [vgr-icon](../vgr-icon)

### Graph
```mermaid
graph TD;
  vgr-button --> vgr-icon
  style vgr-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
