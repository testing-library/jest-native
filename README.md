> [!CAUTION]
> **This package is deprecated and is no longer actively maintained.**
> 
> We encourage you to migrate to React Native Testing Library, v12.4 or later, which includes modern [built-in Jest matchers](https://callstack.github.io/react-native-testing-library/docs/api/jest-matchers) based on the matchers for this repository.
>
> The migration process should be relatively straightforward, we have a [migration guide](https://callstack.github.io/react-native-testing-library/docs/migration/jest-matchers) available.


<div align="center">
  <h1>jest-native</h1>

  <a href="https://www.joypixels.com/emoji/1f985">
    <img
      height="80"
      width="80"
      alt="eagle"
      src="https://raw.githubusercontent.com/testing-library/jest-native/HEAD/other/eagle.png"
    />
  </a>

  <p>Custom jest matchers to test the state of React Native.</p>
</div>

<hr />

[![version](https://img.shields.io/npm/v/@testing-library/jest-native.svg?style=flat-square)](https://www.npmjs.com/package/@testing-library/jest-native)
[![Code Coverage](https://img.shields.io/codecov/c/github/testing-library/jest-native.svg?style=flat-square)](https://codecov.io/github/testing-library/jest-native)
![Build](https://github.com/testing-library/jest-native/actions/workflows/validate.yml/badge.svg)
[![downloads](https://img.shields.io/npm/dm/@testing-library/jest-native.svg?style=flat-square)](http://www.npmtrends.com/@testing-library/jest-native)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Discord](https://img.shields.io/discord/723559267868737556.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/testing-library)
[![Star on GitHub](https://img.shields.io/github/stars/testing-library/jest-native.svg?style=social)](https://github.com/testing-library/jest-native/stargazers)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [The problem](#the-problem)
- [This solution](#this-solution)
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
  - [Extending Jest matchers](#extending-jest-matchers)
  - [TypeScript support](#typescript-support)
- [Matchers](#matchers)
  - [`toBeDisabled`](#tobedisabled)
  - [`toBeEnabled`](#tobeenabled)
  - [`toBeEmptyElement`](#tobeemptyelement)
  - [`toContainElement`](#tocontainelement)
  - [`toBeOnTheScreen`](#tobeonthescreen)
  - [`toHaveProp`](#tohaveprop)
  - [`toHaveTextContent`](#tohavetextcontent)
  - [`toHaveStyle`](#tohavestyle)
  - [`toBeVisible`](#tobevisible)
  - [`toHaveAccessibilityState`](#tohaveaccessibilitystate)
  - [`toHaveAccessibilityValue`](#tohaveaccessibilityvalue)
- [Inspiration](#inspiration)
- [Other solutions](#other-solutions)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

You want to use [jest](https://facebook.github.io/jest/) to write tests that assert various things
about the state of a React Native app. As part of that goal, you want to avoid all the repetitive
patterns that arise in doing so like checking for a native element's props, its text content, its
styles, and more.

## This solution

The `jest-native` library provides a set of custom jest matchers that you can use to extend jest.
These will make your tests more declarative, clear to read and to maintain.

## Compatibility

These matchers should, for the most part, be agnostic enough to work with any React Native testing
utilities, but they are primarily intended to be used with
[React Native Testing Library](https://github.com/callstack/react-native-testing-library). Any
issues raised with existing matchers or any newly proposed matchers must be viewed through
compatibility with that library and its guiding principles first.

## Installation

This module should be installed as one of your project's `devDependencies`:

#### Using `yarn`

```sh
yarn add --dev @testing-library/jest-native
```

#### Using `npm`

```sh
npm install --save-dev @testing-library/jest-native
```

You will need `react-test-renderer`, `react`, and `react-native` installed in order to use this
package.

## Usage

### Extending Jest matchers

Import `@testing-library/jest-native/extend-expect` once (for instance in your
[tests setup file](https://jestjs.io/docs/configuration#setupfilesafterenv-array)) and you're good
to go:

```javascript
import '@testing-library/jest-native/extend-expect';
```

Alternatively, you can selectively import only the matchers you intend to use, and extend jest's
`expect` yourself:

```javascript
import { toBeEmptyElement, toHaveTextContent } from '@testing-library/jest-native';

expect.extend({ toBeEmptyElement, toHaveTextContent });
```

### TypeScript support

In order to setup proper TypeScript type checking use either one of the following approches.

#### 1. Use TypeScript Jest setup file.

Use `jest-setup.ts` file (instead of `jest-setup.js` file) which is added to Jest config's `setupFilesAfterEnv` option.

The Jest setup file should contain following line:

```typescript
import '@testing-library/jest-native/extend-expect';
```

This should enable TypeScript checkign for both `tsc` and VS Code intellisense.

#### 2. Use `declarations.d.ts` file

Alternatively, create `declarations.d.ts` file at the root level of your project, if it does not exist already.

Add following line at the top of your `declarations.d.ts`:

```
/// <reference types="@testing-library/jest-native" />
```

This should enable TypeScript checkign for both `tsc` and VS Code intellisense.

## Matchers

`jest-native` has only been tested to work with
[React Native Testing Library](https://github.com/callstack/react-native-testing-library). Keep in
mind that these queries are intended only to work with elements corresponding to
[host components](https://reactnative.dev/architecture/glossary#react-host-components-or-host-components).

### `toBeDisabled`

```javascript
toBeDisabled();
```

Check whether or not an element is disabled from a user perspective.

This matcher will check if the element or its parent has any of the following props :

- `disabled`
- `accessibilityState={{ disabled: true }}`
- `editable={false}` (for `TextInput` only)

#### Examples

```javascript
const { getByTestId } = render(
  <View>
    <Button disabled testID="button" title="submit" onPress={(e) => e} />
    <TextInput accessibilityState={{ disabled: true }} testID="input" value="text" />
  </View>,
);

expect(getByTestId('button')).toBeDisabled();
expect(getByTestId('input')).toBeDisabled();
```

### `toBeEnabled`

```javascript
toBeEnabled();
```

Check whether or not an element is enabled from a user perspective.

Works similarly to `expect().not.toBeDisabled()`.

#### Examples

```javascript
const { getByTestId } = render(
  <View>
    <Button testID="button" title="submit" onPress={(e) => e} />
    <TextInput testID="input" value="text" />
  </View>,
);

expect(getByTestId('button')).toBeEnabled();
expect(getByTestId('input')).toBeEnabled();
```

### `toBeEmptyElement`

```javascript
toBeEmptyElement();
```

Check that the given element has no content.

#### Examples

```javascript
const { getByTestId } = render(<View testID="empty" />);

expect(getByTestId('empty')).toBeEmptyElement();
```

> **Note**<br/> This matcher has been previously named `toBeEmpty()`, but we changed that name in
> order to avoid conflict with Jest Extendend matcher with the
> [same name](https://github.com/jest-community/jest-extended#tobeempty).

### `toContainElement`

```typescript
toContainElement(element: ReactTestInstance | null);
```

Check if an element contains another element as a descendant. Again, will only work for native
elements.

#### Examples

```javascript
const { queryByTestId } = render(
  <View testID="grandparent">
    <View testID="parent">
      <View testID="child" />
    </View>
    <Text testID="text-element" />
  </View>,
);

const grandparent = queryByTestId('grandparent');
const parent = queryByTestId('parent');
const child = queryByTestId('child');
const textElement = queryByTestId('text-element');

expect(grandparent).toContainElement(parent);
expect(grandparent).toContainElement(child);
expect(grandparent).toContainElement(textElement);
expect(parent).toContainElement(child);
expect(parent).not.toContainElement(grandparent);
```

### `toBeOnTheScreen`

```ts
toBeOnTheScreen();
```

Check that the element is present in the element tree.

You can check that an already captured element has not been removed from the element tree.

> **Note**<br/> This matcher requires React Native Testing Library v10.1 or later, as it includes
> the `screen` object.
>
> **Note**<br/> If you're using React Native Testing Library v12 or later, you need to install Jest
> Native v5.4.2 or later.

#### Examples

```tsx
render(
  <View>
    <View testID="child" />
  </View>,
);

const child = screen.getByTestId('child');
expect(child).toBeOnTheScreen();

screen.update(<View />);
expect(child).not.toBeOnTheScreen();
```

### `toHaveProp`

```typescript
toHaveProp(prop: string, value?: any);
```

Check that the element has a given prop.

You can optionally check that the attribute has a specific expected value.

#### Examples

```javascript
const { queryByTestId } = render(
  <View>
    <Text allowFontScaling={false} testID="text">
      text
    </Text>
    <Button disabled testID="button" title="ok" />
  </View>,
);

expect(queryByTestId('button')).toHaveProp('accessible');
expect(queryByTestId('button')).not.toHaveProp('disabled');
expect(queryByTestId('button')).not.toHaveProp('title', 'ok');
```

### `toHaveTextContent`

```typescript
toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean });
```

Check if an element or its children have the supplied text.

This will perform a partial, case-sensitive match when a string match is provided. To perform a
case-insensitive match, you can use a `RegExp` with the `/i` modifier.

To enforce matching the complete text content, pass a `RegExp`.

#### Examples

```javascript
const { queryByTestId } = render(<Text testID="count-value">2</Text>);

expect(queryByTestId('count-value')).toHaveTextContent('2');
expect(queryByTestId('count-value')).toHaveTextContent(2);
expect(queryByTestId('count-value')).toHaveTextContent(/2/);
expect(queryByTestId('count-value')).not.toHaveTextContent('21');
```

### `toHaveStyle`

```typescript
toHaveStyle(style: object[] | object);
```

Check if an element has the supplied styles.

You can pass either an object of React Native style properties, or an array of objects with style
properties. You cannot pass properties from a React Native stylesheet.

#### Examples

```javascript
const styles = StyleSheet.create({ text: { fontSize: 16 } });

const { queryByText } = render(
  <Text
    style={[
      { color: 'black', fontWeight: '600', transform: [{ scale: 2 }, { rotate: '45deg' }] },
      styles.text,
    ]}
  >
    Hello World
  </Text>,
);

expect(getByText('Hello World')).toHaveStyle({ color: 'black' });
expect(getByText('Hello World')).toHaveStyle({ fontWeight: '600' });
expect(getByText('Hello World')).toHaveStyle({ fontSize: 16 });
expect(getByText('Hello World')).toHaveStyle([{ fontWeight: '600' }, { color: 'black' }]);
expect(getByText('Hello World')).toHaveStyle({ color: 'black', fontWeight: '600', fontSize: 16 });
expect(getByText('Hello World')).toHaveStyle({ transform: [{ scale: 2 }, { rotate: '45deg' }] });
expect(getByText('Hello World')).not.toHaveStyle({ color: 'white' });
expect(getByText('Hello World')).not.toHaveStyle({ transform: [{ scale: 2 }] });
expect(getByText('Hello World')).not.toHaveStyle({
  transform: [{ rotate: '45deg' }, { scale: 2 }],
});
```

### `toBeVisible`

```typescript
toBeVisible();
```

Check that the given element is visible to the user.

An element is visible if **all** the following conditions are met:

- it does not have its style property `display` set to `none`.
- it does not have its style property `opacity` set to `0`.
- it is not a `Modal` component or it does not have the prop `visible` set to `false`.
- it is not hidden from accessibility as checked by
  [`isHiddenFromAccessibility`](https://callstack.github.io/react-native-testing-library/docs/api/#ishiddenfromaccessibility)
  function from React Native Testing Library
- its ancestor elements are also visible.

#### Examples

```javascript
const { getByTestId } = render(<View testID="empty-view" />);

expect(getByTestId('empty-view')).toBeVisible();
```

```javascript
const { getByTestId } = render(<View testID="view-with-opacity" style={{ opacity: 0.2 }} />);

expect(getByTestId('view-with-opacity')).toBeVisible();
```

```javascript
const { getByTestId } = render(<Modal testID="empty-modal" />);

expect(getByTestId('empty-modal')).toBeVisible();
```

```javascript
const { getByTestId } = render(
  <Modal>
    <View>
      <View testID="view-within-modal" />
    </View>
  </Modal>,
);

expect(getByTestId('view-within-modal')).toBeVisible();
```

```javascript
const { getByTestId } = render(<View testID="invisible-view" style={{ opacity: 0 }} />);

expect(getByTestId('invisible-view')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(<View testID="display-none-view" style={{ display: 'none' }} />);

expect(getByTestId('display-none-view')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(
  <View style={{ opacity: 0 }}>
    <View>
      <View testID="view-within-invisible-view" />
    </View>
  </View>,
);

expect(getByTestId('view-within-invisible-view')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(
  <View style={{ display: 'none' }}>
    <View>
      <View testID="view-within-display-none-view" />
    </View>
  </View>,
);

expect(getByTestId('view-within-display-none-view')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(
  <Modal visible={false}>
    <View>
      <View testID="view-within-not-visible-modal" />
    </View>
  </Modal>,
);

// Children elements of not visible modals are not rendered.
expect(queryByTestId('view-within-modal')).toBeNull();
```

```javascript
const { getByTestId } = render(<Modal testID="not-visible-modal" visible={false} />);

expect(getByTestId('not-visible-modal')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(<View testID="test" accessibilityElementsHidden />);

expect(getByTestId('test')).not.toBeVisible();
```

```javascript
const { getByTestId } = render(
  <View testID="test" importantForAccessibility="no-hide-descendants" />,
);

expect(getByTestId('test')).not.toBeVisible();
```

### `toHaveAccessibilityState`

```ts
toHaveAccessibilityState(state: {
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  busy?: boolean;
  expanded?: boolean;
});
```

Check that the element has given accessibility state entries.

This check is based on `accessibilityState` prop but also takes into account the default entries
which have been found by experimenting with accessibility inspector and screen readers on both iOS
and Android.

Some state entries behave as if explicit `false` value is the same as not having given state entry,
so their default value is `false`:

- `disabled`
- `selected`
- `busy`

The remaining state entries behave as if explicit `false` value is different than not having given
state entry, so their default value is `undefined`:

- `checked`
- `expanded`

This matcher is compatible with `*ByRole` and `*ByA11State` queries from React Native Testing
Library.

#### Examples

```js
render(<View testID="view" accessibilityState={{ expanded: true, checked: true }} />);

// Single value match
expect(screen.getByTestId('view')).toHaveAccessibilityState({ expanded: true });
expect(screen.getByTestId('view')).toHaveAccessibilityState({ checked: true });

// Can match multiple entries
expect(screen.getByTestId('view')).toHaveAccessibilityState({ expanded: true, checked: true });
```

Default values handling:

```js
render(<View testID="view" />);

// Matching states where default value is `false`
expect(screen.getByTestId('view')).toHaveAccessibilityState({ disabled: false });
expect(screen.getByTestId('view')).toHaveAccessibilityState({ selected: false });
expect(screen.getByTestId('view')).toHaveAccessibilityState({ busy: false });

// Matching states where default value is `undefined`
expect(screen.getByTestId('view')).not.toHaveAccessibilityState({ checked: false });
expect(screen.getByTestId('view')).not.toHaveAccessibilityState({ expanded: false });
```

### `toHaveAccessibilityValue`

```ts
toHaveAccessibilityValue(value: {
  min?: number;
  max?: number;
  now?: number;
  text?: string | RegExp;
});
```

Check that the element has given `accessibilityValue` prop entries.

This matcher is compatible with `*ByRole` and `*ByA11Value` queries from React Native Testing
Library.

#### Examples

```js
render(<View testID="view" accessibilityValue={{ min: 0, max: 100, now: 65 }} />);

const view = screen.getByTestId('view');

// Single value match
expect(view).toHaveAccessibilityValue({ now: 65 });
expect(view).toHaveAccessibilityValue({ max: 0 });

// Can match multiple entries
expect(view).toHaveAccessibilityValue({ min: 0, max: 100 });
expect(view).toHaveAccessibilityValue({ min: 0, max: 100, now: 65 });

// All specified entries need to match
expect(view).not.toHaveAccessibilityValue({ now: 45 });
expect(view).not.toHaveAccessibilityValue({ min: 20, max: 100, now: 65 });
```

```js
render(<View testID="view" accessibilityValue={{ text: 'Almost full' }} />);

const view = screen.getByTestId('view');
expect(view).toHaveAccessibilityValue({ text: 'Almost full' });
expect(view).toHaveAccessibilityValue({ text: /full/ });
```

## Inspiration

This library was made to be a companion for
[React Native Testing Library](https://github.com/callstack/react-native-testing-library).

It was inspired by [jest-dom](https://github.com/gnapse/jest-dom/), the companion library for
[DTL](https://github.com/kentcdodds/dom-testing-library/). We emulated as many of those helpers as
we could while keeping in mind the guiding principles.

## Other solutions

None known, [you can add the first](http://makeapullrequest.com)!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/bcarroll22"><img src="https://avatars2.githubusercontent.com/u/11020406?v=4" width="100px;" alt=""/><br /><sub><b>Brandon Carroll</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=bcarroll22" title="Code">💻</a> <a href="https://github.com/testing-library/jest-native/commits?author=bcarroll22" title="Documentation">📖</a> <a href="#infra-bcarroll22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/testing-library/jest-native/commits?author=bcarroll22" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://santiagomartin.dev"><img src="https://avatars2.githubusercontent.com/u/7255298?v=4" width="100px;" alt=""/><br /><sub><b>Santi</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=SantiMA10" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/marnusw"><img src="https://avatars0.githubusercontent.com/u/971499?v=4" width="100px;" alt=""/><br /><sub><b>Marnus Weststrate</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=marnusw" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Shywim"><img src="https://avatars3.githubusercontent.com/u/1584563?v=4" width="100px;" alt=""/><br /><sub><b>Matthieu Harlé</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=Shywim" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/acatalina"><img src="https://avatars3.githubusercontent.com/u/23233812?v=4" width="100px;" alt=""/><br /><sub><b>Alvaro Catalina</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=acatalina" title="Code">💻</a></td>
    <td align="center"><a href="http://www.ilkeryilmaz.com"><img src="https://avatars1.githubusercontent.com/u/1588236?v=4" width="100px;" alt=""/><br /><sub><b>ilker Yılmaz</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=ilkeryilmaz" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/donovanhiland"><img src="https://avatars2.githubusercontent.com/u/17991396?v=4" width="100px;" alt=""/><br /><sub><b>Donovan Hiland</b></sub></a><br /><a href="https://github.com/testing-library/jest-native/commits?author=donovanhiland" title="Code">💻</a> <a href="https://github.com/testing-library/jest-native/commits?author=donovanhiland" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
