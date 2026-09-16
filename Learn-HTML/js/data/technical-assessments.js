window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

const technicalQuestion = (id, category, question, options, answer, explanation) => ({
  id, category, question, options, answer, explanation, difficulty: answer % 2 ? "medium" : "easy"
});

window.HTMLMaster.data.TECHNICAL_ASSESSMENTS = [
  {
    id: "logical-thinking", language: "Logical Thinking", title: "Logical Thinking Assessment",
    description: "Measure reasoning, patterns, sequencing, and objective decision making.", durationMinutes: 12,
    questions: [
      technicalQuestion("logic-1", "Patterns", "What comes next: 2, 4, 8, 16, ?", ["18", "24", "32", "36"], 2, "Each value is doubled."),
      technicalQuestion("logic-2", "Conditions", "If all A are B and all B are C, what must be true?", ["All C are A", "All A are C", "No A are C", "Some C are not B"], 1, "The implication chain is A -> B -> C."),
      technicalQuestion("logic-3", "Sequences", "Which value breaks the sequence 3, 6, 12, 24, 49?", ["6", "12", "24", "49"], 3, "The next doubled value should be 48."),
      technicalQuestion("logic-4", "Problem Solving", "What is the first useful step when a solution fails an edge case?", ["Delete the test", "Reproduce and isolate the case", "Add random code", "Ignore the result"], 1, "Reproduction and isolation turn a failure into an actionable problem."),
      technicalQuestion("logic-5", "Algorithms", "Which strategy repeatedly chooses the locally best available option?", ["Greedy", "Backtracking", "Hashing", "Recursion"], 0, "A greedy strategy makes a locally optimal choice at each step.")
    ]
  },
  {
    id: "problem-solving", language: "Problem Solving", title: "Problem Solving Assessment",
    description: "Check decomposition, complexity awareness, debugging, and algorithm selection.", durationMinutes: 12,
    questions: [
      technicalQuestion("solve-1", "Decomposition", "Breaking a large problem into smaller independent tasks is called what?", ["Decomposition", "Compilation", "Casting", "Serialization"], 0, "Decomposition reduces complexity by separating responsibilities."),
      technicalQuestion("solve-2", "Complexity", "Binary search on a sorted array has which typical time complexity?", ["O(1)", "O(log n)", "O(n)", "O(n²)"], 1, "The search space is halved on every comparison."),
      technicalQuestion("solve-3", "Debugging", "What should a minimal reproducible example contain?", ["Every project file", "Only the smallest code that still shows the failure", "No input", "Only comments"], 1, "Reducing the case makes the defect easier to reason about."),
      technicalQuestion("solve-4", "Data Structures", "Which structure is best for first-in-first-out processing?", ["Stack", "Queue", "Set", "Tree"], 1, "A queue removes the earliest inserted item first."),
      technicalQuestion("solve-5", "Testing", "A test that checks a known boundary value is a(n) ...", ["Edge-case test", "Build step", "Import", "Comment"], 0, "Boundary values often expose logic errors.")
    ]
  },
  {
    id: "programming-fundamentals", language: "Programming Fundamentals", title: "Programming Fundamentals Assessment",
    description: "Test variables, control flow, functions, data structures, and testing basics.", durationMinutes: 12,
    questions: [
      technicalQuestion("fund-1", "Variables", "A variable is best described as ...", ["A named storage location", "A compiler", "A network", "A comment"], 0, "Variables associate names with values in a program."),
      technicalQuestion("fund-2", "Functions", "Why use a function?", ["To repeat named behavior", "To remove all types", "To prevent testing", "To guarantee speed"], 0, "Functions package reusable behavior behind a clear interface."),
      technicalQuestion("fund-3", "Control Flow", "Which construct chooses between alternatives?", ["if/else", "include", "namespace", "typedef"], 0, "if/else controls conditional execution."),
      technicalQuestion("fund-4", "Arrays", "What is the usual benefit of an indexed array?", ["Constant-time indexed access", "Automatic networking", "No memory use", "No ordering"], 0, "Array indexing is typically direct and constant time."),
      technicalQuestion("fund-5", "Testing", "A unit test should primarily test ...", ["One small unit of behavior", "The whole internet", "Only deployment", "A user's password"], 0, "Unit tests isolate a small behavior or component.")
    ]
  },
  {
    id: "java", language: "Java", title: "Java Technical Assessment", description: "Evaluate Java syntax, OOP, collections, exceptions, and runtime concepts.", durationMinutes: 12,
    questions: [
      technicalQuestion("java-1", "OOP", "Which keyword declares a class inherits from another class?", ["extends", "inherits", "superclass", "using"], 0, "Java uses extends for class inheritance."),
      technicalQuestion("java-2", "Collections", "Which Java collection stores key-value pairs?", ["List", "Set", "Map", "Queue"], 2, "Map associates keys with values."),
      technicalQuestion("java-3", "Exceptions", "Which block handles a thrown exception?", ["catch", "rescue", "except", "recover"], 0, "Java uses catch after try."),
      technicalQuestion("java-4", "Types", "Which type stores true or false?", ["boolean", "logical", "bitvalue", "truth"], 0, "boolean is Java's logical type."),
      technicalQuestion("java-5", "Runtime", "What does the JVM execute?", ["Java bytecode", "Only HTML", "SQL tables", "Git commits"], 0, "The JVM executes compiled Java bytecode.")
    ]
  },
  {
    id: "csharp", language: "C#", title: "C# Technical Assessment", description: "Evaluate C# types, LINQ, OOP, async programming, and .NET concepts.", durationMinutes: 12,
    questions: [
      technicalQuestion("cs-1", "Types", "Which C# type represents a true or false value?", ["bool", "truth", "bit", "logical"], 0, "bool is the C# Boolean type."),
      technicalQuestion("cs-2", "OOP", "Which keyword prevents a class from being inherited?", ["sealed", "closed", "finalize", "locked"], 0, "sealed prevents inheritance."),
      technicalQuestion("cs-3", "LINQ", "What does LINQ provide?", ["Query operations over data", "A compiler", "A database server", "A UI theme"], 0, "LINQ provides expressive queries over collections and other data sources."),
      technicalQuestion("cs-4", "Async", "Which keyword marks a method that can await asynchronous work?", ["async", "awaitable", "parallel", "future"], 0, "async enables await within a method."),
      technicalQuestion("cs-5", "Memory", "What generally manages unreachable managed objects in .NET?", ["Garbage collector", "Manual delete", "SQL engine", "Linker"], 0, "The .NET garbage collector reclaims unreachable managed objects.")
    ]
  },
  {
    id: "python", language: "Python", title: "Python Technical Assessment", description: "Evaluate Python data structures, functions, exceptions, and idiomatic code.", durationMinutes: 12,
    questions: [
      technicalQuestion("py-1", "Collections", "Which Python type stores ordered mutable items?", ["list", "tuple", "set", "frozenset"], 0, "list is ordered and mutable."),
      technicalQuestion("py-2", "Functions", "Which keyword defines a Python function?", ["def", "func", "function", "define"], 0, "Python uses def to define functions."),
      technicalQuestion("py-3", "Exceptions", "Which block handles an exception?", ["except", "catch", "handle", "rescue"], 0, "Python uses except with try."),
      technicalQuestion("py-4", "Generators", "Which keyword yields values lazily?", ["yield", "lazy", "emit", "stream"], 0, "yield turns a function into a generator."),
      technicalQuestion("py-5", "Dictionaries", "How do you access a dictionary value by key?", ["mapping[key]", "mapping->key", "mapping.keyOnly", "getKey(mapping)"], 0, "Square brackets access a dictionary value by key.")
    ]
  },
  {
    id: "dbms", language: "DBMS", title: "DBMS Technical Assessment", description: "Test database design, normalization, transactions, indexing, and consistency.", durationMinutes: 12,
    questions: [
      technicalQuestion("db-1", "Transactions", "What does atomicity mean?", ["All operations happen or none do", "Data is always sorted", "Queries are free", "Tables have no keys"], 0, "Atomicity makes a transaction all-or-nothing."),
      technicalQuestion("db-2", "Keys", "What uniquely identifies a row?", ["Primary key", "View", "Trigger", "Index file"], 0, "A primary key uniquely identifies a row."),
      technicalQuestion("db-3", "Normalization", "Normalization primarily reduces what?", ["Redundant data and update anomalies", "Network speed", "Password length", "Screen size"], 0, "Normalization organizes related data to reduce redundancy."),
      technicalQuestion("db-4", "Indexes", "What is a common tradeoff of adding indexes?", ["Faster reads but extra storage/write cost", "No reads", "No storage", "Automatic backups"], 0, "Indexes improve lookup speed but consume resources."),
      technicalQuestion("db-5", "Consistency", "Which property means committed data follows constraints?", ["Consistency", "Isolation", "Atomicity", "Durability"], 0, "Consistency preserves valid database state.")
    ]
  },
  {
    id: "sql", language: "SQL", title: "SQL Technical Assessment", description: "Evaluate SELECT, joins, grouping, filtering, and data modification.", durationMinutes: 12,
    questions: [
      technicalQuestion("sql-1", "Queries", "Which clause filters rows before grouping?", ["WHERE", "HAVING", "ORDER", "LIMIT"], 0, "WHERE filters source rows before grouping."),
      technicalQuestion("sql-2", "Joins", "Which join returns matching rows from both tables?", ["INNER JOIN", "OUTER ONLY", "CROSS FILTER", "MATCH JOIN"], 0, "INNER JOIN returns rows with matching join keys."),
      technicalQuestion("sql-3", "Grouping", "Which clause groups rows for aggregate calculations?", ["GROUP BY", "COLLECT BY", "AGGREGATE", "PARTITION ONLY"], 0, "GROUP BY creates groups for aggregate functions."),
      technicalQuestion("sql-4", "Modification", "Which command adds a new row?", ["INSERT", "APPEND ROWS ONLY", "CREATE ROW", "PUSH"], 0, "INSERT adds rows to a table."),
      technicalQuestion("sql-5", "Aggregation", "Which function counts rows?", ["COUNT", "TOTAL_ROWS_ONLY", "NUMBER", "ROWS"], 0, "COUNT returns the number of rows or non-null values depending on its argument.")
    ]
  }
];
