export default function About() {
  return (
    <div className="pt-12 max-w-xl mx-auto">
      <h1 className="text-3xl text-center p-10 font-bold">About RepLiszt</h1>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          What does RepLiszt do?
        </div>
        <div className="collapse-content text-sm">
          <p>Short answer: It's just a glorified work list / tune list.</p>
          <br />
          <p>
            Long answer: Aside from making it trivially easy to sort your list
            by composer, year published, style, etc. the feature that spawned
            this idea was to be able to press a single button to update a 'Last
            Practiced' column to today's date. That way, you can easily find and
            choose pieces to review in your limited practice time.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Why did you make this?
        </div>
        <div className="collapse-content text-sm">
          <p>
            Back in school I had a "tune binder" with a tunelist as the first
            page, and lead sheets for all the standards and jazz tunes I knew. I
            also had a separate binder for solo repertoire, and yet another
            binder for "classical" repertoire.
          </p>
          <br />
          <p>
            Anyone who has been playing for a while knows that keeping up with
            all of your previously learned repertoire while is a job in and of
            itself. However, in the 21st century, being an artist is considered
            frivolous and "not a real job" so most of us have day jobs. With
            limited time, the efficiency of any practice session is extremely
            important. This tool was built in the hopes that it can offload some
            of the effort of keeping track of your repertoire and making it
            trivial to see which pieces you need to review the most.
          </p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          What's with the awful name?
        </div>
        <div className="collapse-content text-sm">
          Surely you got the reference ... My primary teacher named several
          compositions after letters of the alphabet because he hated naming
          things. I'm not any better at it so there ya go
        </div>
      </div>
    </div>
  );
}
