// Storage Mock
const storageMock = () => {
  const storage = {};

  return {
    setItem: (key, value) => {
      storage[key] = value || '';
    },
    getItem: (key) => (key in storage ? storage[key] : null),
  };
};

const localStorage = storageMock();

exports.localStorage = localStorage;