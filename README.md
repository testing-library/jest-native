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

[![Build Status](https://travis-ci.org/testing-library/jest-native.svg?branch=main)](https://travis-ci.org/testing-library/jest-native)
[![Code Coverage](https://img.shields.io/codecov/c/github/testing-library/jest-native.svg?style=flat-square)](https://codecov.io/github/testing-library/jest-native)
[![version](https://img.shields.io/npm/v/@testing-library/jest-native.svg?style=flat-square)](https://www.npmjs.com/package/@testing-library/jest-native)
[![downloads](https://img.shields.io/npm/dm/@testing-library/jest-native.svg?style=flat-square)](http://www.npmtrends.com/@testing-library/jest-native)
[![MIT License](https://img.shields.io/npm/l/@testing-library/jest-native.svg?style=flat-square)](https://github.com/testing-library/jest-native/blob/main/LICENSE)

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/testing-library/jest-native/blob/main/CODE_OF_CONDUCT.md)
[![Discord](https://img.shields.io/discord/723559267868737556.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/testing-library)

[![Watch on GitHub](https://img.shields.io/github/watchers/testing-library/jest-native.svg?style=social)](https://github.com/testing-library/jest-native/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/testing-library/jest-native.svg?style=social)](https://github.com/testing-library/jest-native/stargazers)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [The problem](#the-problem)
- [This solution](#this-solution)
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
- [Matchers](#matchers)
  - [`toBeDisabled`](#tobedisabled)
  - [`toBeEnabled`](#tobeenabled)
  - [`toBeEmptyElement`](#tobeemptyelement)
  - [`toContainElement`](#tocontainelement)
  - [`toHaveProp`](#tohaveprop)
  - [`toHaveTextContent`](#tohavetextcontent)
  - [`toHaveStyle`](#tohavestyle)
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
[RNTL](https://github.com/callstack/react-native-testing-library). Any issues raised with existing
matchers or any newly proposed matchers must be viewed through compatibility with that library and
its guiding principles first.

## Installation

This module should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @testing-library/jest-native
```

You will need `react-test-renderer`, `react`, and `react-native` installed in order to use this
package.

## Usage

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

## Matchers

`jest-native` has only been tested to work with `RNTL`. Keep in mind that these queries will only
work on UI elements that bridge to native.

### `toBeDisabled`

```javascript
toBeDisabled();
```

Check whether or not an element is disabled from a user perspective.

This matcher will check if the element or its parent has a `disabled` prop, or if it has
`accessibilityState={{disabled: true}}.

It also works with `accessibilityStates={['disabled']}` for now. However, this prop is deprecated in
React Native [0.62](https://reactnative.dev/blog/2020/03/26/version-0.62#breaking-changes)

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

---

**NOTE**

`toBeEmptyElement()` matcher has been renamed from `toBeEmpty()` because of the naming conflict with
Jest Extended export with the
[same name](https://github.com/jest-community/jest-extended#tobeempty).

---

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

### `toHaveProp`

```typescript
toHaveProp(prop: string, value?: any);
```

Check that an element has a given prop.

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

expect(queryByTestId('button')).toHaveProp('accessibilityStates', ['disabled']);
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

## Inspiration

This library was made to be a companion for
[RNTL](https://github.com/callstack/react-native-testing-library).

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
