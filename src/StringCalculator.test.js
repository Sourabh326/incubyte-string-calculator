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
  
  