package main

import (
	"errors"
	"fmt"
)

// Just check if provided data is key-value pairs
func TmplWithAttributes(kv ...any) (map[string]any, error) {
	if len(kv)%2 != 0 {
		return nil, errors.New("WithAttributes: specify k->v pairs")
	}

	data := make(map[string]any, len(kv)/2)
	for i := 0; i < len(kv); i += 2 {
		k := kv[i].(string)
		v := fmt.Sprintf("%v", kv[i+1])

		data[k] = v
	}
	return data, nil
}
