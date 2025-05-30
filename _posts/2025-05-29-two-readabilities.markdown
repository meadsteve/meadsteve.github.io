---
layout: post
published: false
title:  "The two kinds of readability"
date:   2025-03-16 10:00:00
categories: programming
summary: "The two kinds of readability"
icon: fas fa-book
tags:
    - go
    - python 
    - readability 
---

## Which language is more readable?
As someone who works with a number of languages I often encounter statements that reduce down to the following:

> Go is much more readable than python.

and its opposite:

> Python is much more readable than go.

Somewhat confusingly I agree with both. I recently realised that how I reconcile this seeming contradiction is that the above statements are actually talking about different kinds of readability. 

## Contrived example
To illustrate what I mean I'll start with some toy code in both languages. 

```python
output_numbers = [doubled(n) for n in input_numbers]
```

```go
	outputNumbers := make([]int, len(inputNumbers))
	for i := range inputNumbers {
		outputNumbers[i] = inputNumbers[i] * 2
	}
```


## Another example
```python
data = {"Name": "Steve"}

response = requests.post(
    'https://postman-echo.com/post',
    data=json.dumps(data),
    headers={'Content-type': 'application/json'}
)

if response.status_code != 200:
    raise Exception(f"Request failed with status code {response.status_code}")

responseBody = json.loads(response.content)

print(responseBody)
```

```go
	data := map[string]any{
		"Name": "Steve",
	}

	jsonBody, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("unable to marshal request data: %w", err)
	}
	bodyReader := bytes.NewReader(jsonBody)

	resp, err := http.Post("https://postman-echo.com/post", "application/json", bodyReader)
	if err != nil {
		return fmt.Errorf("error making request: %w", err)
	}

	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var responseBody map[string]any
	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		return fmt.Errorf("error decoding response body: %w", err)
	}

	fmt.Printf("Response: %+v\n", responseBody)
```
