---
title: Styleguide (English ver)
date: 2019-12-30
authors: ['daichi-furiya']
---

# Don't use heading level 1

Heading level 1 (`<h1>`) is used for the title of the article, so it is assumed that it is basically not used in the main text. If you use headings, use heading level 2 (`<h2>`), which is used below. (Same style as heading level 2)

## Supported styles

This theme **supports the following styles**: Markdown's commonly used syntax is generally _covered_, so you can focus on writing the article.

- Emphasis
  - `<em>`
  - `<strong>`
- ~~Strikethrough~~
- [Link](#)
- Horizon line
- List
  - Ordered list (`<ol>`)
  - Unordered list (`<ul>`)
- Table
- Code
  - Code blocks
  - Inline code
- Quote
- Footnote [^1]
- Image (Use custom shortcode)
- Tweet

[^1]: Annotations look like this.

### List

You can use ordered and unordered lists.

#### Ordered

1. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text.
1. This is dummy-text. This is dummy-text. This is dummy-text.
1. This is dummy-text. This is dummy-text. This is dummy-text.
1. This is dummy-text. This is dummy-text. This is dummy-text.
   1. This is nested dummy-text.
   1. This is nested dummy-text.
   1. This is nested dummy-text.
1. This is dummy-text. This is dummy-text. This is dummy-text.

#### Unordered

- This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text. This is dummy-text.
- This is dummy-text. This is dummy-text. This is dummy-text.
  - This is nested dummy-text.
  - This is nested dummy-text.
  - This is nested dummy-text.
- This is dummy-text. This is dummy-text. This is dummy-text.

### Quote

> I have not failed. I’ve just found 10,000 ways that won’t work.
>
> Thomas Edison

### Code blocks

```shell:Single-line
$ echo "Hello World" >> hello.txt
```

One line of code block is displayed as above. The following is displayed on multiple lines.

```typescript:Multi-line
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const canUseHistory = !canUseDOM
  ? false
  : window.history &&
    'pushState' in window.history &&
    window.location.protocol !== 'file:';

export const canUsePassiveOption = (() => {
  let support = false;

  if (!canUseDOM) {
    return support;
  }

  /* tslint:disable:no-empty */
  try {
    const win = window;
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        support = true;
      },
    });

    win.addEventListener('test', null as any, opts);
    win.removeEventListener('test', null as any, opts);
  } catch (e) {}
  /* tslint:enable */

  return support;
})();
```

In addition to setting the language to highlight, you can add statements to the code block with the following syntax:

````
```<lang>:<Sentences without spaces>
````

### Table

| Left align | Right align | Center align |
| :--------- | ----------: | :----------: |
| This       |        This |     This     |
| column     |      column |    column    |
| will       |        will |     will     |
| be         |          be |      be      |
| left       |       right |    center    |
| aligned    |     aligned |   aligned    |

### Embeded image

Provides shortcodes for each type of named and unnamed parameters.

```
image "example.png" "example image"
```

**Output:**

{{< image "example.png" "example image" >}}

```
image src="example.png" alt="example image"
```

**Output:**

{{< image src="example.png" alt="example image" >}}

### Tweet

A built-in shortcode provided by Hugo.

```
tweet "1199218445503488001"
```

**Output:**

{{< tweet "1199218445503488001" >}}

---

Here's a headline-level style using dummy text.

#### Heading level 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

##### Heading level 5

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
