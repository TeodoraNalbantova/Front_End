function multiplePromises() {
      // Създаване на три промиса
      const p1 = new Promise(resolve => setTimeout(() => resolve("Resolved 1"), 1000)); 
      const p2 = new Promise(resolve => setTimeout(() => resolve("Resolved 2"), 2000));
      const p3 = new Promise((_, reject) => setTimeout(() => reject("Rejected 3"), 3000));
      
      // Използване на Promise.allSettled, за да изчака всички промиси да се разрешат или отхвърлят
      Promise.allSettled([p1, p2, p3]).then(results => {
          // Обхождане на резултатите и извеждане на статусите и стойностите или причините за отхвърляне
          results.forEach(result => console.log(result.status, result.value || result.reason));
      });
  }
  