function Register({ setSelectedTab }) {
  return (
    <>
      <h3 className="text-lg font-bold">Register</h3>

      <form className="mt-2 flex flex-col gap-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" placeholder="Enter your name" className="input input-bordered" />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input type="email" placeholder="Enter your email" className="input input-bordered" />
        </label>

        <div className="flex gap-4">
          <label className="form-control grow">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input type="password" placeholder="Enter your password" className="input input-bordered" />
          </label>

          <label className="form-control grow">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input type="password" placeholder="Enter your confirm password" className="input input-bordered" />
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already an account?{' '}
        <button
          type="button"
          onClick={() => setSelectedTab('login')}
          className="link link-hover font-semibold link-primary"
        >
          Sign In
        </button>
      </p>
    </>
  );
}

export default Register;
