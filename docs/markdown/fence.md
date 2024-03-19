## Fenced code blocks

Fenced code blocks start with line beginning with either:

    ```

or

    ~~~

Then line content is taken and trimmed of whitespace, and if the string is not empty, it is a language indication.

    ```javascript
    let a = 2;
    if (true) {
        console.log("ture");
    }
    ```

The fenced code block is closed by a line starting with the same marker. Anything after it is ignored.

## HTML equivalent

<pre>
    <code>
    ...
    </code>
</pre>
