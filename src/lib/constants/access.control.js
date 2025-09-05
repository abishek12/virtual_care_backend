import AccessControl from "accesscontrol";

const ac = new AccessControl();

ac.grant("editor")
  .readOwn("profile")
  .createAny("article")
  .createAny("testimonial")
  .readAny("career")
  .deleteAny("career")
  .readAny("article")
  .updateAny("article")
  .updateAny("booking")
  .deleteAny("booking")
  .deleteAny("article");

ac.grant("administrator")
  .extend("editor")
  .readAny("profile")
  .updateAny("profile")
  .deleteAny("article")
  .deleteAny("career");

ac.grant("subscriber").readAny("article").readOwn("profile");

export default ac;
