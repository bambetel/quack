## Processing container

### Flow content

Does any strict precedence order of tags/tag parts make more sense?

0. pass through a subset of HTML tags
    - sanitize if other tags 
    - strip or escape if not balanced
    - remove scripts
    - strip attributes, selectors (?)
1. inline code (not escaped)
   A. double-tick code
   B. single-tick code
2. urls
   A. full URLs
       - URL label is parsed as flow content, can contain formatting and images
       - URL title for title attribute
   B. short <urls>
3. text formatting - greedy pairing, shift closing token forward while possible
    A. take word-boundaries alignment into consideration!

        __bold text _bold em___ --> <strong>bold text _bold em_</strong> --> <strong>bold text <em>bold em</em></strong>
