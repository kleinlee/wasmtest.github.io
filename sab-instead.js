// 检查浏览器是否支持SharedArrayBuffer
if (typeof SharedArrayBuffer === 'undefined') {
  console.log("SharedArrayBuffer undefined");
  // 创建一个替代的共享内存数组
  class SharedArrayBufferReplacement {
    constructor(length) {
      this.buffer = new ArrayBuffer(length);
      this.uint8Array = new Uint8Array(this.buffer);
    }
  }

  // 替代的Atomics对象
  const AtomicsReplacement = {
    add(array, index, value) {
      array.uint8Array[index] += value;
    },
    // 其他Atomics方法同样进行替代
  };

  // 替代的SharedArrayBuffer对象
  const SharedArrayBufferReplacement = {
    isView(obj) {
      return obj instanceof SharedArrayBufferReplacement.uint8Array.constructor;
    },
    // 其他SharedArrayBuffer方法同样进行替代
  };

  // 将替代的对象赋值给全局变量
  self.SharedArrayBuffer = SharedArrayBufferReplacement;
  self.Atomics = AtomicsReplacement;
}