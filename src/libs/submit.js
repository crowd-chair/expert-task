import $ from "jquery";
import { tag } from "./load_sessions_info";

const randomstr = function(length) {
  let s = "";
  length = length || 32;
  for (let i = 0; i < length; i++) {
    var random = (Math.random() * 16) | 0;
    s += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return s;
};

export const submit = corrections => {
  const stringifyCorrections = JSON.stringify(corrections);
  let $uid = localStorage.user;
  if (!$uid) {
    $uid = randomstr();
    localStorage.user = $uid;
  }

  const tasks = {
    uid: $uid,
    tag: tag,
    corrections: stringifyCorrections,
  };
  console.log(tasks);

  if (process.env.NODE_ENV === "production") {
    const $store = $("[name=store]")[0];
    $($store.tid).val($store._FACT1___tid.value);
    $($store.uid).val(tasks.uid);
    $($store.tag).val(tasks.tag);
    $($store.corrections).val(tasks.corrections);
    $($store).submit();
  }
};
