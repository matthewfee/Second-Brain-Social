export const PostReacted = ({ comments }) => {
  const commentsString = (commentsData) => {
    if (!commentsData) {
      return '';
    }

    if (commentsData.length === 1) {
      return `1 Comment`;
    }

    return `${commentsData.length} Comments`;
  };

  return (
    <div className="flex justify-between relative">
      <div className="flex ">
        {/* <div className="">
          <PostProfileImage imageSRC="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="absolute left-6">
          <PostProfileImage imageSRC="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="absolute left-12">
          <PostProfileImage imageSRC="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
        </div> */}
      </div>
      <div className="flex gap-4 ">
        <div className="">{commentsString(comments)}</div>
        {/* <div className="">17 Share</div> */}
      </div>
    </div>
  );
};
