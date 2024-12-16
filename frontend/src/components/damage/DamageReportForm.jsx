import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function DamageReportForm() {
  const modalRef = useRef(null);

  function openModal() {
    modalRef.current?.showModal();
  }

  function onSubmit(e) {
    e.preventDefault();
    modalRef.current?.close();
    toast('Thanks for reporting!', { type: 'success' });
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-square btn-error text-white btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>

      <dialog ref={modalRef} className="modal overflow-y-auto">
        <div className="modal-box text-base font-normal text-center text-base-content">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>

          <h3 className="text-xl font-bold">Report</h3>
          <p className="text-base-content/70 mt-2">Hello there, is there anything wrong with the facilities?</p>

          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Facility Name</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered" required />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea className="textarea textarea-bordered" placeholder="Describe the damage" required></textarea>
            </label>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
