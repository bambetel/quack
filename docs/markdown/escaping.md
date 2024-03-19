# Markdown escaping 

## Symbol escaping 

## Element escaping

Backslashes used to escape markdown elements are stripped, to put a literal backslash, double it.

Characters to escape in flow text are:

    []{}()<>*_#-+:

Those are:
- formatting marks
- URL specification
- HTML tags
- block marks

HTML enties are always preserved, but when &amp; begins is in another context doesn't require escaping (?)

Some HTML tags, according to Md processor might be preserved.

Underscores could be treated literally in the middle of a word or in apparent snake case identifiers.

    This is not_for_formatting, Md standards discourage it, use asterisks instead.

### List markers

OL 

    \1. first 2. second 3. third

UL 

    - list item
    \- not a list item

### Flow special characters

Formatting

    This is not \*\*strong text\*\*
    This is not \*\*strong text\*\*

    Just to be sure, 4 \* 3 = 12.

URLs
