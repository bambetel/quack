# Mardown-HTML element nesting

## Element levels 

Markdown-HTML elements can be of 3 levels:
1. container element
2. block element 
3. flow element 

## Container elements 

Container elements are 
1. document root
2. blockquote - can contain anything
    - headings: should be adjusted to headings outside the quote or shifted
      automatically? If results if h(>6), then CSS styles?
3. compound list item, see: [lists](lists.md)

## Block elements 

Block elements are contained within adjacent non-empty whole lines within the
same container.

Block elements are:
- paragraph
- simple list item
- compound list item first block

## Flow elements

Each single component is a part of a single block element. For example,
formatting symbols cannot span outside a block element.

Some must be contained within a single line:
- footnote references
- links (?)
- images (?)

## HTML Tags

    H{N} > EM, STRONG, CODE
