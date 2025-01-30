# **Jest Cheatsheet - Quick Reference Guide** 🎯  

## **1. Basic Syntax**
| Syntax | Description |
|---------|-------------|
| `test(description, fn)` | Defines a test case |
| `it(description, fn)` | Alias for `test` |
| `describe(description, fn)` | Groups related tests |

### **Example**
```js
test('adds numbers correctly', () => {
  expect(2 + 3).toBe(5);
});

describe('Math operations', () => {
  it('subtracts numbers', () => {
    expect(5 - 2).toBe(3);
  });
});
```

---

## **2. Expectations (`expect`)**
| Matcher | Description |
|---------|-------------|
| `expect(value).toBe(expected)` | Exact match (primitives) |
| `expect(value).toEqual(expected)` | Deep equality (objects, arrays) |
| `expect(value).not.toBe(expected)` | Negation |

### **Example**
```js
expect(3).toBe(3);
expect({ a: 1 }).toEqual({ a: 1 });
expect(5).not.toBe(10);
```

---

## **3. Truthiness Matchers**
| Matcher | Description |
|---------|-------------|
| `toBeNull()` | Checks for `null` |
| `toBeDefined()` | Checks if defined |
| `toBeUndefined()` | Checks if `undefined` |
| `toBeTruthy()` | Checks if truthy |
| `toBeFalsy()` | Checks if falsy |

### **Example**
```js
expect(null).toBeNull();
expect(5).toBeDefined();
expect(0).toBeFalsy();
```

---

## **4. Number Matchers**
| Matcher | Description |
|---------|-------------|
| `toBeGreaterThan(num)` | Checks if greater |
| `toBeLessThan(num)` | Checks if smaller |
| `toBeGreaterThanOrEqual(num)` | Checks if greater or equal |
| `toBeCloseTo(num)` | Handles floating-point precision |

### **Example**
```js
expect(10).toBeGreaterThan(5);
expect(0.1 + 0.2).toBeCloseTo(0.3);
```

---

## **5. String & Array Matchers**
| Matcher | Description |
|---------|-------------|
| `toMatch(regex/string)` | Checks substring match |
| `toContain(item)` | Checks if array contains an item |

### **Example**
```js
expect('Hello Jest').toMatch(/Jest/);
expect([1, 2, 3]).toContain(2);
```

---

## **6. Mock Functions**
| Syntax | Description |
|---------|-------------|
| `jest.fn()` | Creates a mock function |
| `mockFn.mockReturnValue(value)` | Mocks a return value |
| `mockFn.mockResolvedValue(value)` | Mocks a resolved promise value |

### **Example**
```js
const mockFn = jest.fn().mockReturnValue(10);
expect(mockFn()).toBe(10);
```

---

## **7. Mocking Modules**
| Syntax | Description |
|---------|-------------|
| `jest.mock('modulePath', factory)` | Mocks a module |
| `jest.spyOn(object, 'method')` | Spies on a method |

### **Example**
```js
jest.mock('./module', () => ({
  fetchData: jest.fn(() => Promise.resolve('data')),
}));
```

---

## **8. Asynchronous Testing**
| Matcher | Description |
|---------|-------------|
| `resolves.toBe(value)` | Tests resolved promise |
| `rejects.toBe(value)` | Tests rejected promise |

### **Example**
```js
test('resolves correctly', async () => {
  await expect(Promise.resolve('data')).resolves.toBe('data');
});
```

---

## **9. Setup & Teardown**
| Hook | Description |
|------|-------------|
| `beforeAll(fn)` | Runs before all tests |
| `afterAll(fn)` | Runs after all tests |
| `beforeEach(fn)` | Runs before each test |
| `afterEach(fn)` | Runs after each test |

### **Example**
```js
beforeEach(() => console.log('Runs before each test'));
afterEach(() => console.log('Runs after each test'));
```

---

## **10. Snapshot Testing**
| Matcher | Description |
|---------|-------------|
| `toMatchSnapshot()` | Compares against a stored snapshot |

### **Example**
```js
expect({ name: 'John' }).toMatchSnapshot();
```

---

## **11. Jest CLI Commands**
| Command | Description |
|---------|-------------|
| `npx jest` | Runs all tests |
| `npx jest --watch` | Runs in watch mode |
| `npx jest --coverage` | Generates coverage report |

---

## **12. Sample Code for Testing Node.js + Express + Mongoose**
### **Setup**
```js
const request = require('supertest');
const express = require('express');

const app = express();
app.get('/hello', (req, res) => res.json({ message: 'Hello, world!' }));
```

### **Test Case**
```js
const request = require('supertest');

test('GET /hello returns correct message', async () => {
  const response = await request(app).get('/hello');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Hello, world!');
});
```

---

## **13. Sample Code: Mongoose Model Testing**
```js
const mongoose = require('mongoose');
const User = mongoose.model('User', new mongoose.Schema({ name: String }));

test('Creates a new user', async () => {
  const user = new User({ name: 'John Doe' });
  await user.save();
  const foundUser = await User.findOne({ name: 'John Doe' });
  expect(foundUser.name).toBe('John Doe');
});
```

---
