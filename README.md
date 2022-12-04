# @gregchlosta/option-ts

> Simple implementation of TypeScript Option type with Pattern Matching

## The `Option<T>` and Its Advantages Over Null Values

The problem with null values is that if you try to use a null value as a not-null value, you’ll get an error of some kind. Because this null or not-null property is pervasive, it’s extremely easy to make this kind of error.

However, the concept that null is trying to express is still a useful one: a null is a value that is currently invalid or absent for some reason.

The problem isn’t really with the concept but with the particular implementation. Type `Option<T>` with Pattern Matching functionality provided by this library can help you with this.

## How to Install:

```shell
npm install @gregchlosta/option-ts

```

## How to Use

`Option<T>` is a discriminated union of `Some<T>` and `None`. When we have a Some value, we know that a value is present and the value is held within the Some. When we have a None value, in some sense, it means the same thing as null. We don’t have a valid value.

### Initialize the `Option<T>` value

```ts
import { Option, newOption } from '@gregchlosta/option-ts'

// Type will automatically get inferred when value is provided as parameter.
const some = newOption('Some Value') // -> Option<string> -> (Some<string>)

// When creating a None Option, manual typing possible value type is required since automatic type inferrance is not possible
const none: Option<string> = newOption() // -> Option<string> -> (None)
```

### Patern matching with match function

Match function will take `Option<T>`, and matcher object as parameters. Functions declared in the matcher object always have to return the same value type.
Example below come from React, but it is not limited only to React.

```tsx
import React from 'react'
import { Option, match } from '@gregchlosta/option-ts'

export type ButtonProps = {
  title: Option<string>
}

export const Button: React.FC<ButtonProps> = ({ title }) => {
  return match(title, {
    Some: (v) => <button>{v}</button>,
    None: () => <button>Default</button>,
  })
}
```

### Unpacking Option<T> with withDefault function

To get direct access to the value we can simple unpack option using `withDefault()` which takes two parameters: option, and default value.

```ts
import { Option, newOption, withDefault } from '@gregchlosta/option-ts'

const someOption = newOption('Some!')
const noneOption: Option<string> = newOption()

const valueSome = withDefault(someOption, 'default') // 'Some!'
const valueDefault = withDefault(noneOption, 'default') // 'default'
```

## License

The MIT License
