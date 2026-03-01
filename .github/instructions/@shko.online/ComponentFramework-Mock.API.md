# ComponentFramework-Mock
## API Reference
### Classes

#### `ComponentFrameworkMockGenerator<IInputs, IOutputs>`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `db` | `MetadataDB` | - |
| `context` | `ContextMock<IInputs>` | - |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | - |
| `ExecuteUpdateView()` | `void` | - |


---

<a name="componentframeworkmockgeneratorreact"></a>
#### `ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `db` | `MetadataDB` | - |
| `context` | `ContextMock<IInputs>` | - |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | - |
| `ExecuteUpdateView()` | `ReactElement` | - |


---

<a name="componentframeworkmockorchestrator"></a>
#### `ComponentFrameworkMockOrchestrator`
exported from `@shko.online/componentframework-mock`

**Properties:**

| Name | Type | Description |
|------|------|-------------|
| `controls` | `OrchestratorInput<T>` | - |
| `db` | `MetadataDB` | - |
| `mockGenerators` | `OrchestratorGenerators<T>` | - |

**Methods:**

| Method | Returns | Description |
|--------|---------|-------------|
| `ExecuteInit()` | `void` | - |
| `ExecuteUpdateView()` | `void` | - |


---
