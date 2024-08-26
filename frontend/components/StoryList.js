import Link from "next/link";

export function StoryList({ stories }) {
  return (
    <div>
      <div className="stories">
        <div className="stories__wrapper">
          <div className="stories__header">stories</div>
          <div className="row">
            <div className="col-lg-6">
              <div className="stories__inner">
                <h5>Aurthur: Sobuj</h5>
                <p>Data: 24-05-2025</p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ul>
        {stories?.map((story) => (
          <li key={story?._id}>
            <Link href={`/story/${story?._id}`}>
              <a>{story?.title}</a>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
