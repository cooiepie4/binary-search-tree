class bst {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
    this.count = 0;
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (node === null) {
      return new Node(value);
    }
    if (node.data === value) {
      return node;
    }
    if (value < node.data) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertRec(node.right, value);
    }
    return node;
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value);
  }

  _deleteRec(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this._deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteRec(node.right, value);
    } else {
      // Node to delete found

      // Case 1: Leaf node
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case 2: Node with only one child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 3: Node with two children
      // Find the minimum node in the right subtree
      let minRight = this._findMin(node.right);
      // Replace the current node's value with the minimum value
      node.data = minRight.data;
      // Delete the minimum node from the right subtree
      node.right = this._deleteRec(node.right, minRight.data);
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
  find(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else {
      return node;
    }
  }
  levelOrder(node = this.root, callback) {
    let queue = [];
    let result = [];
    let currentLevel = [];
    queue.push(node);

    for (let i = 0; i < queue.length; i++) {
      let current = queue.shift();
      currentLevel.push(current.data);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.rigjt);
      }
    }
    result.push(currentLevel);
    return result;
  }

  preOrder(node = this.root, callback) {
    if (!this.preOrderData) {
      this.preOrderData = [];
    }

    // Base case: if the node is null, return
    if (node === null) {
      return;
    }

    // Process the current node
    this.preOrderData.push(node.data);

    // Recursively process left subtree
    this.preOrder(node.left, callback);

    // Recursively process right subtree
    this.preOrder(node.right, callback);

    // Return the result array
    return this.preOrderData;
  }
  inOrder(node = this.root, callback) {
    if (!this.inOrderData) {
      this.inOrderData = [];
    }

    // Base case: if the node is null, return
    if (node === null) {
      return;
    }
    this.inOrder(node.left, callback);
    // Process the current node
    this.inOrderData.push(node.data);

    // Recursively process left subtree

    // Recursively process right subtree
    this.inOrder(node.right, callback);

    // Return the result array
    return this.inOrderData;
  }
  postOrder(node = this.root, callback) {
    if (!this.postOrderData) {
      this.postOrderData = [];
    }

    // Base case: if the node is null, return
    if (node === null) {
      return;
    }

    // Process the current node

    // Recursively process left subtree
    this.postOrder(node.left, callback);

    // Recursively process right subtree
    this.postOrder(node.right, callback);
    this.postOrderData.push(node.data);

    // Return the result array
    return this.postOrderData;
  }

  height(node) {
    // Base case: if the node is null, its height is 0
    if (node === null) {
      return 0;
    }

    // Recursively calculate the height of left and right subtrees
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    // Return the maximum of left and right subtree heights, plus 1 for the current node
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) {
      return null;
    }
    if (value === node.data) {
      return currentDepth;
    }
    if (value < node.data) {
      return this.depth(value, node.left, currentDepth + 1);
    } else if (value > node.data) {
      return this.depth(value, node.right, currentDepth + 1);
    }
  }

  isBalanced() {
    let node = this.root;
    if (this.height(node.left) === this.height(node.right)) {
      return true;
    } else if (this.height(node.left) - this.height(node.right) === 1) {
      return true;
    } else if (this.height(node.right) - this.height(node.left) === 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    // Get all values in the tree in sorted order
    let values = this.traversal();

    return (this.root = this.buildTree(values, 0, values.length - 1));
  }

  traversal(node = this.root) {
    let newArray = [];
    if (node === null) {
      return [];
    }
    newArray = newArray.concat(this.traversal(node.left));
    newArray.push(node.data);
    newArray = newArray.concat(this.traversal(node.right));

    return newArray;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const array = [1, 2, 3, 4, 5];
const searchTree = new bst(array);
searchTree.insert(8);
searchTree.insert(10);
searchTree.rebalance();
searchTree.prettyPrint();
console.log(searchTree.isBalanced());
console.log(searchTree.preOrder(array));
console.log(searchTree.inOrder(array));
console.log(searchTree.postOrder(array));
