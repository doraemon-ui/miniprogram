export function customPromise<T>() {
  let _resolveCallback!: (value: T | PromiseLike<T>) => void
  let _rejectCallback!: (reason?: unknown) => void
  let _promiseState: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  let promise = new Promise<T>((resolve, reject) => {
    _resolveCallback = resolve
    _rejectCallback = reject
  }).then(
    (value) => {
      _promiseState = 'fulfilled'
      return value
    },
    (err) => {
      _promiseState = 'rejected'
      throw err
    },
  )
  return {
    promise,
    get promiseState() {
      return _promiseState
    },
    resolve: (value: T | PromiseLike<T>) => {
      if (_promiseState !== 'pending') return
      _resolveCallback(value)
    },
    reject: (reason?: unknown) => {
      if (_promiseState !== 'pending') return
      _rejectCallback(reason)
    },
  }
}
