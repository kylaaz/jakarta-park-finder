import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function ReviewForm() {
  const [onStep, setStep] = useState(1);

  const modalRef = useRef(null);

  function openModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-primary">
        Add a Review
      </button>

      <dialog ref={modalRef} className="modal overflow-y-auto">
        <div className="modal-box text-center">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>

          <h3 className="text-xl font-bold">Add a Review</h3>

          {onStep === 1 && <ParkReviewForm setStep={setStep} />}
          {onStep === 2 && <FacilityReviewForm setStep={setStep} modalRef={modalRef} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function ParkReviewForm({ setStep }) {
  return (
    <form className="mt-2 flex flex-col items-center gap-2">
      <p className="text-base-content/70">How&apos;s the park?</p>

      <div className="rating rating-lg mt-4">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
      </div>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Review</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Share your experience about this park"
        ></textarea>
      </label>

      <div className="modal-action w-full">
        <button type="button" onClick={() => setStep(2)} className="btn btn-primary px-8">
          Next
        </button>
      </div>
    </form>
  );
}

function FacilityReviewForm({ setStep, modalRef }) {
  function onSubmit(e) {
    e.preventDefault();
    modalRef.current?.close();
    toast('Your review has been submitted!', { type: 'success' });
    setStep(1);
  }

  return (
    <form onSubmit={onSubmit} className="mt-2 flex flex-col items-center gap-2">
      <p className="text-base-content/70">How&apos;s the facilities?</p>

      <div className="rating rating-lg mt-4">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" defaultChecked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-primary" />
      </div>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Review</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Share your experience about these facilities"
        ></textarea>
      </label>

      <div className="modal-action w-full justify-between">
        <button type="button" onClick={() => setStep(1)} className="btn btn-primary px-8">
          Back
        </button>
        <button className="btn btn-primary px-8">Submit</button>
      </div>
    </form>
  );
}
