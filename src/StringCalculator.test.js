const add = (numbers) => {
    if (!numbers) return 0;
  
    let delimiter = /,|\n/;
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      const delimiterString = numbers.substring(2, delimiterEndIndex);
      const delimiters = delimiterString.match(/\[(.*?)\]/g);
  
      if (delimiters) {
        delimiter = new RegExp(
          delimiters
            .map(d => d.slice(1, -1).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
            .join('|')
        );
      } else {
        delimiter = new RegExp(delimiterString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      }
  
      numbers = numbers.substring(delimiterEndIndex + 1);
    }
  
    const nums = numbers.split(delimiter).map(Number);
    const negatives = nums.filter(num => num < 0);
    if (negatives.length) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  
    return nums.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
  };
  
  test('should return 0 for an empty string', () => {
    expect(add('')).toBe(0);
  });
  
  test('should return the number itself for a single number', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
  });
  
  test('should return the sum for two numbers', () => {
    expect(add('1,2')).toBe(3);
    expect(add('10,20')).toBe(30);
  });
  
  test('should return the sum for multiple numbers', () => {
    expect(add('1,2,3')).toBe(6);
    expect(add('4,5,6,7')).toBe(22);
  });
  
  test('should handle new lines between numbers', () => {
    expect(add('1\n2,3')).toBe(6);
    expect(add('4\n5\n6')).toBe(15);
  });
  
  test('should support different delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
    expect(add('//|\n4|5|6')).toBe(15);
  });
  
  test('should support multiple delimiters', () => {
    expect(add('//[;][|]\n1;2|3')).toBe(6);
    expect(add('//[***][%%%]\n1***2%%%3')).toBe(6);
  });
  
  test('should throw an error for negative numbers', () => {
    expect(() => add('1,-2,3')).toThrow('Negatives not allowed: -2');
    expect(() => add('1,-2,-3')).toThrow('Negatives not allowed: -2, -3');
  });
  
  test('should ignore numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1000,1001,1002')).toBe(1000);
  });
  