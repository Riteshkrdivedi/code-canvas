// convex/seedData.ts
import { mutation } from "./_generated/server";

export const seedTestData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing test data first (optional)
    console.log("Starting to seed test data...");

    // Create test users
    const user1Id = await ctx.db.insert("users", {
      userId: "test_user_1",
      email: "john@example.com",
      name: "John Doe",
      isPro: false,
    });

    const user2Id = await ctx.db.insert("users", {
      userId: "test_user_2",
      email: "jane@example.com",
      name: "Jane Smith",
      isPro: true,
      proSince: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      lemonSqueezyCustomerId: "cus_12345",
      lemonSqueezyOrderId: "ord_67890",
    });

    const user3Id = await ctx.db.insert("users", {
      userId: "test_user_3",
      email: "bob@example.com",
      name: "Bob Johnson",
      isPro: false,
    });

    // Create test code executions
    await ctx.db.insert("codeExecutions", {
      userId: "test_user_1",
      language: "javascript",
      code: "console.log('Hello, World!');",
      output: "Hello, World!",
    });

    await ctx.db.insert("codeExecutions", {
      userId: "test_user_1",
      language: "python",
      code: "print('Python is awesome!')",
      output: "Python is awesome!",
    });

    await ctx.db.insert("codeExecutions", {
      userId: "test_user_2",
      language: "javascript",
      code: "const sum = (a, b) => a + b;\nconsole.log(sum(5, 3));",
      output: "8",
    });

    await ctx.db.insert("codeExecutions", {
      userId: "test_user_3",
      language: "python",
      code: "import math\nprint(math.pi)",
      error: "ImportError: No module named 'math'",
    });

    // Create test snippets
    const snippet1Id = await ctx.db.insert("snippets", {
      userId: "test_user_1",
      title: "Array Helper Functions",
      language: "javascript",
      code: `// Useful array helper functions
const unique = arr => [...new Set(arr)];
const shuffle = arr => arr.sort(() => Math.random() - 0.5);
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// Usage examples
console.log(unique([1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
console.log(shuffle([1, 2, 3, 4, 5])); // Random order
console.log(chunk([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]`,
      userName: "John Doe",
    });

    const snippet2Id = await ctx.db.insert("snippets", {
      userId: "test_user_2",
      title: "Python Data Processing",
      language: "python",
      code: `import pandas as pd
import numpy as np

# Sample data processing pipeline
def process_data(data):
    # Clean and transform data
    df = pd.DataFrame(data)
    df = df.dropna()
    df['normalized'] = (df['value'] - df['value'].mean()) / df['value'].std()
    return df

# Example usage
sample_data = {'value': [1, 2, 3, 4, 5, np.nan, 7, 8, 9, 10]}
result = process_data(sample_data)
print(result.head())`,
      userName: "Jane Smith",
    });

    const snippet3Id = await ctx.db.insert("snippets", {
      userId: "test_user_3",
      title: "React Custom Hook",
      language: "javascript",
      code: `import { useState, useEffect } from 'react';

// Custom hook for local storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Usage in component
const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
};`,
      userName: "Bob Johnson",
    });

    // Create test snippet comments
    await ctx.db.insert("snippetComments", {
      snippetId: snippet1Id,
      userId: "test_user_2",
      userName: "Jane Smith",
      content:
        "<p>Great utility functions! I especially like the chunk function.</p>",
    });

    await ctx.db.insert("snippetComments", {
      snippetId: snippet1Id,
      userId: "test_user_3",
      userName: "Bob Johnson",
      content: "<p>Thanks for sharing! The unique function is very clean.</p>",
    });

    await ctx.db.insert("snippetComments", {
      snippetId: snippet2Id,
      userId: "test_user_1",
      userName: "John Doe",
      content: "<p>Nice pandas pipeline! Very useful for data cleaning.</p>",
    });

    await ctx.db.insert("snippetComments", {
      snippetId: snippet3Id,
      userId: "test_user_1",
      userName: "John Doe",
      content:
        "<p>Love this custom hook! Will definitely use it in my projects.</p>",
    });

    // Create test stars
    await ctx.db.insert("stars", {
      userId: "test_user_2",
      snippetId: snippet1Id,
    });

    await ctx.db.insert("stars", {
      userId: "test_user_3",
      snippetId: snippet1Id,
    });

    await ctx.db.insert("stars", {
      userId: "test_user_1",
      snippetId: snippet2Id,
    });

    await ctx.db.insert("stars", {
      userId: "test_user_1",
      snippetId: snippet3Id,
    });

    await ctx.db.insert("stars", {
      userId: "test_user_2",
      snippetId: snippet3Id,
    });

    console.log("✅ Test data seeded successfully!");
    console.log(`Created users: ${user1Id}, ${user2Id}, ${user3Id}`);
    console.log(
      `Created snippets: ${snippet1Id}, ${snippet2Id}, ${snippet3Id}`
    );

    return {
      success: true,
      message: "Test data has been seeded successfully!",
      counts: {
        users: 3,
        codeExecutions: 4,
        snippets: 3,
        comments: 4,
        stars: 5,
      },
    };
  },
});
