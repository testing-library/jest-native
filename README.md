<div align="center">
  <h1>jest-native</h1>
  
  <a href="https://www.joypixels.com/emoji/1f985">
    <img
      height="80"
      width="80"
      alt="goat"
      src="https://raw.githubusercontent.com/bcarroll22/jest-native/master/other/eagle.png"
    />
  </a>
    
  <p>Custom jest matchers to test the state of React Native.</p>
</div>

<hr />

[![Build Status](https://travis-ci.org/bcarroll22/jest-native.svg?branch=master)](https://travis-ci.org/bcarroll22/jest-native)
[![Code Coverage](https://img.shields.io/codecov/c/github/bcarroll22/jest-native.svg?style=flat-square)](https://codecov.io/github/bcarroll22/jest-native)
[![version](https://img.shields.io/npm/v/jest-native.svg?style=flat-square)](https://www.npmjs.com/package/jest-native)
[![downloads](https://img.shields.io/npm/dm/jest-native.svg?style=flat-square)](http://www.npmtrends.com/jest-native)
[![MIT License](https://img.shields.io/npm/l/jest-native.svg?style=flat-square)](https://github.com/bcarroll22/jest-native/blob/master/LICENSE)

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/bcarroll22/jest-native/blob/master/CODE_OF_CONDUCT.md)

[![Watch on GitHub](https://img.shields.io/github/watchers/bcarroll22/jest-native.svg?style=social)](https://github.com/bcarroll22/jest-native/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/bcarroll22/jest-native.svg?style=social)](https://github.com/bcarroll22/jest-native/stargazers)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [The problem](#the-problem)
- [This solution](#this-solution)
- [Installation](#installation)
- [Usage](#usage)
- [Matchers](#matchers)
  - [`toBeDisabled`](#tobedisabled)
  - [`toBeEnabled`](#tobeenabled)
  - [`toBeEmpty`](#tobeempty)
  - [`toContainElement(element)`](#tocontainelementelement)
  - [`toHaveProp(prop, value)`](#tohavepropprop-value)
  - [`toHaveTextContent(text)`](#tohavetextcontenttext)
  - [`toHaveStyle(styles)`](#tohavestylestyles)
- [Inspiration](#inspiration)
- [Other solutions](#other-solutions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

You want to use [jest](https://facebook.github.io/jest/) to write tests that assert various things
about the state of a React Native tree. As part of that goal, you want to avoid all the repetitive
patterns that arise in doing so like checking for a native element's props, its text content, its
styles, and more.

## This solution

The `jest-native` library provides a set of custom jest matchers that you can use to extend jest.
These will make your tests more declarative, clear to read and to maintain.

## Installation

This module should be installed as one of your project's `devDependencies`:

```
npm install --save-dev jest-native
```

You will need `native-testing-library`, `react`, and `react-native` installed in order to use this
package.

## Usage

Import `jest-native/extend-expect` once (for instance in your
[tests setup file](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string))
and you're good to go:

```javascript
import 'jest-native/extend-expect';
```

Alternatively, you can selectively import only the matchers you intend to use, and extend jest's
`expect` yourself:

```javascript
import { toBeEmpty, toHaveTextContent } from 'jest-native';

expect.extend({ toBeEmpty, toHaveTextContent });
```

## Matchers

`jest-native` has only been tested to work with `native-testing-library`. Keep in mind that these
queries will only work on UI elements that bridge to native.

### `toBeDisabled`

```javascript
toBeDisabled();
```

Check whether or not an element is disabled from a user perspective.

This matcher will check if the element or its parent has a `disabled` prop, or if it has
`accessibilityStates={['disabled']}`.

#### Examples

```javascript
const { getByTestId } = render(
  <View>
    <Button disabled testID="button" title="submit" onPress={e => e} />
    <TextInput accessibilityStates={['disabled']} testID="input" value="text" />
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
    <Button testID="button" title="submit" onPress={e => e} />
    <TextInput testID="input" value="text" />
  </View>,
);

expect(getByTestId('button')).toBeEnabled();
expect(getByTestId('input')).toBeEnabled();
```

### `toBeEmpty`

```javascript
toBeEmpty();
```

Check that the given element has no content.

#### Examples

```javascript
const { getByTestId } = render(<View testID="empty" />);

expect(getByTestId('empty')).toBeEmpty();
```

### `toContainElement(element)`

```javascript
toContainElement();
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

### `toHaveProp(prop, value)`

```javascript
toHaveProp(prop, value);
```

Check that an element has a given prop. Only works for native elements, so this is similar to
checking for attributes in the DOM.

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

### `toHaveTextContent(text)`

```javascript
toHaveTextContent(text);
```

Check if an element has the supplied text.

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

### `toHaveStyle(styles)`

```javascript
toHaveStyle(styles);
```

Check if an element has the supplied styles.

You can pass either an object of React Native style properties, or an array of objects with style
properties. You cannot pass properties from a React Native stylesheet..

#### Examples

```javascript
const styles = StyleSheet.create({ text: { fontSize: 16 } });

const { queryByText } = render(
  <Text style={[{ color: 'black', fontWeight: '600' }, styles.text]}>Hello World</Text>,
);

expect(queryByText('Hello World')).toHaveStyle({ color: 'black', fontWeight: '600', fontSize: 16 });
expect(queryByText('Hello World')).toHaveStyle({ color: 'black' });
expect(queryByText('Hello World')).toHaveStyle({ fontWeight: '600' });
expect(queryByText('Hello World')).toHaveStyle({ fontSize: 16 });
expect(queryByText('Hello World')).toHaveStyle([{ color: 'black' }, { fontWeight: '600' }]);
expect(queryByText('Hello World')).not.toHaveStyle({ color: 'white' });
```

## Inspiration

This library was made to be a companion for
[native-testing-library](https://github.com/bcarroll22/native-testing-library).

It was inspired by [jest-dom](https://github.com/gnapse/jest-dom/), the companion library for
[dom-testing-library](https://github.com/kentcdodds/dom-testing-library/). We emulated as many of
those helpers as we could while keeping in mind the guiding principles.

## Other solutions

None known, [you can add the first](http://makeapullrequest.com)!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/bcarroll22"><img src="https://avatars2.githubusercontent.com/u/11020406?v=4" width="100px;" alt="Brandon Carroll"/><br /><sub><b>Brandon Carroll</b></sub></a><br /><a href="https://github.com/bcarroll22/jest-native/commits?author=bcarroll22" title="Code">💻</a> <a href="https://github.com/bcarroll22/jest-native/commits?author=bcarroll22" title="Documentation">📖</a> <a href="#infra-bcarroll22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/bcarroll22/jest-native/commits?author=bcarroll22" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
