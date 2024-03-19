# Markdown footnotes

## HTML output 

Footnote references in order and are given number (from 1) that is shown:

    A paragraph containing a footnote², and the next one³. Footnotes will be all rendered in the end of the document after a hr or whatever style is used.

    -----------------------------
    1. Previous footnote 
    2. A longer footnote 

        With a container.

    3. Third footnote

HTML output could be an ol with lis containing original reference - each can be simple or compound list item. Thus can use default ol numbering to represent items.

Each footnote reference links to for example `footnote-{number}` and footnote li has this id.
