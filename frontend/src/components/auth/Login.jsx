function Login({ setSelectedTab }) {
  return (
    <>
      <h3 className="text-lg font-bold">Login</h3>

      <form className="mt-2 flex flex-col gap-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input type="email" placeholder="Enter your email" className="input input-bordered" />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input type="password" placeholder="Enter your password" className="input input-bordered" />
        </label>

        <button type="submit" className="btn btn-primary mt-2">
          Sign In
        </button>
      </form>

      <p className="mt-4">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => setSelectedTab('register')}
          className="link link-hover font-semibold link-primary"
        >
          Sign Up
        </button>
      </p>
    </>
  );
}

export default Login;
