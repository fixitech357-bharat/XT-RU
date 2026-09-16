window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.CPP_ASSESSMENTS = [
  {
    id: "cpp-fundamentals",
    title: "C++ Fundamentals",
    description: "Core syntax, types, control flow, functions, and problem solving.",
    durationMinutes: 20,
    questions: [
      { id: "cpp-1", category: "Fundamentals", question: "Which function is the entry point of a standard C++ program?", options: ["start()", "main()", "run()", "init()"], answer: 1, explanation: "Execution begins in the main function.", difficulty: "easy" },
      { id: "cpp-2", category: "Variables & Data Types", question: "Which type stores a true or false value?", options: ["bit", "bool", "logical", "flag"], answer: 1, explanation: "bool represents true or false values.", difficulty: "easy" },
      { id: "cpp-3", category: "Operators", question: "What does the % operator return for integer operands?", options: ["The quotient", "The remainder", "The percentage", "The product"], answer: 1, explanation: "The modulo operator returns the remainder after integer division.", difficulty: "easy" },
      { id: "cpp-4", category: "Conditions", question: "Which keyword executes an alternative branch when an if condition is false?", options: ["otherwise", "else", "default", "fallback"], answer: 1, explanation: "else provides the alternative branch of an if statement.", difficulty: "easy" },
      { id: "cpp-5", category: "Loops", question: "Which loop is guaranteed to execute its body at least once?", options: ["for", "while", "do-while", "range-for"], answer: 2, explanation: "A do-while checks its condition after the first iteration.", difficulty: "easy" },
      { id: "cpp-6", category: "Functions", question: "What does a function parameter passed by const reference avoid?", options: ["Type checking", "Copying the argument", "Return values", "Compilation"], answer: 1, explanation: "A const reference can read the original object without copying it.", difficulty: "medium" },
      { id: "cpp-7", category: "Arrays & Strings", question: "Which standard type owns a mutable sequence of characters?", options: ["std::string", "std::text", "char_text", "string_view_only"], answer: 0, explanation: "std::string owns and manages a mutable character sequence.", difficulty: "easy" },
      { id: "cpp-8", category: "Pointers", question: "What does nullptr represent?", options: ["A pointer to zero-sized memory", "A null pointer value", "An invalid integer", "A deleted object"], answer: 1, explanation: "nullptr is the type-safe null pointer literal introduced in C++11.", difficulty: "medium" },
      { id: "cpp-9", category: "References", question: "After initialization, can a C++ reference be reseated to another object?", options: ["Yes, always", "Only for const objects", "No", "Only inside classes"], answer: 2, explanation: "A reference remains an alias for its original object.", difficulty: "medium" },
      { id: "cpp-10", category: "OOP", question: "Which principle hides implementation details behind a public interface?", options: ["Inheritance", "Encapsulation", "Iteration", "Overloading"], answer: 1, explanation: "Encapsulation controls access to implementation details.", difficulty: "easy" },
      { id: "cpp-11", category: "Classes & Objects", question: "What is called automatically when an object is created?", options: ["Destructor", "Constructor", "Finalizer", "Allocator"], answer: 1, explanation: "A constructor initializes an object during creation.", difficulty: "easy" },
      { id: "cpp-12", category: "Inheritance & Polymorphism", question: "Which keyword enables dynamic dispatch through a base pointer?", options: ["dynamic", "virtual", "override_only", "dispatch"], answer: 1, explanation: "A virtual function can be overridden and dispatched dynamically.", difficulty: "medium" },
      { id: "cpp-13", category: "STL vector", question: "Which container provides contiguous dynamic storage?", options: ["std::vector", "std::map", "std::set", "std::queue"], answer: 0, explanation: "std::vector stores elements contiguously and grows dynamically.", difficulty: "easy" },
      { id: "cpp-14", category: "STL map", question: "What does std::map keep ordered by default?", options: ["Values only", "Keys", "Insertion timestamps", "Hash buckets"], answer: 1, explanation: "std::map maintains its keys in sorted order.", difficulty: "medium" },
      { id: "cpp-15", category: "STL Algorithms", question: "Which header provides std::sort?", options: ["<vector>", "<algorithm>", "<sorting>", "<iterator>"], answer: 1, explanation: "The standard algorithms, including sort, are declared in <algorithm>.", difficulty: "easy" },
      { id: "cpp-16", category: "Templates", question: "What do function templates enable?", options: ["Runtime inheritance", "Generic code for multiple types", "Automatic garbage collection", "Binary-only functions"], answer: 1, explanation: "Templates allow type-independent code to be generated at compile time.", difficulty: "medium" },
      { id: "cpp-17", category: "Exception Handling", question: "Which block handles an exception?", options: ["catch", "handle", "except", "recover"], answer: 0, explanation: "A catch block handles an exception thrown from a try block.", difficulty: "easy" },
      { id: "cpp-18", category: "Memory Management", question: "Which operation releases memory allocated with new?", options: ["free", "release", "delete", "destroy"], answer: 2, explanation: "delete releases a single object allocated with new.", difficulty: "easy" },
      { id: "cpp-19", category: "Smart Pointers", question: "Which smart pointer expresses exclusive ownership?", options: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr_shared"], answer: 2, explanation: "std::unique_ptr has exclusive ownership and cannot be copied.", difficulty: "medium" },
      { id: "cpp-20", category: "Modern C++", question: "Which feature lets the compiler infer a variable's type from its initializer?", options: ["infer", "auto", "deduce_var", "typeof"], answer: 1, explanation: "auto requests type deduction from the initializer.", difficulty: "easy" }
    ]
  }
];
