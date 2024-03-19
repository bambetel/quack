## ATX Headings

ATX headers levels N=1..6 (HTML H1..6) are a line starting with N hashes followed by a WS character and a block of text (limited tags).

    # This is a H1
    #### This is a H4

Any hashes following the text are ignored as a syntax `## Heading ##` might be allowed (the count of hashes doesn't have to match, the opening tells the heading level).

An extension is to set heading id like this:

    # Heading 1 {#heading-id}

IDEA: Generalize to other element for id and selector inclusion.

    Paragraph with selector. {.mystyle}

## Settext Headings

A Settext heading consists of a block (looking and parsed like a regular p) and a following "underline" consisting of a `=` or `-` repeated at least 3 times (No spaces inside, may be indented up to 3 spaces).

1. h1:
    
    Heading 1
    =========

2. h2:
    
    Heading 2
    ---------

GFM allows line breaks in this type of heading. Therefore the example below is considered a h1, not a paragraph + hr.

    Very long Settext heading wrapped 
    in two lines. Just like a p followed by a hr 
    but the "underscore" has no whitespace
    ===

Also GFM allows up to 3 spaces in front of the line content - it probably also appliest to both heading text and settext "underline".
