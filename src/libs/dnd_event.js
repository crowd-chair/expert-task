// import $ from "jquery";
//
// $(document).ready(function() {
//   console.log("dnd_event call");
//
//   var dragging = null;
//
//   var getDropZone = function(dragging, target) {
//     if (!dragging || !target) {
//       return null;
//     }
//     var targetDropzone = null;
//     var myDropzone = dragging.parent();
//     if (target.hasClass("dropzone")) {
//       targetDropzone = target;
//     } else if (target.parent().hasClass("dropzone")) {
//       targetDropzone = target.parent();
//     }
//     if (myDropzone.attr("id") === targetDropzone.attr("id")) {
//       return null;
//     }
//     return targetDropzone;
//   };
//
//   $(`.draggable`)
//     .on("dragstart", function(e) {
//       dragging = $(this);
//     })
//     .on("dragend", function(e) {
//       dragging = null;
//     });
//
//   $(`.dropzone`)
//     .on("dragstart", function(e) {
//       e.originalEvent.dataTransfer.setData("text/plain", e.target.id);
//     })
//     .on("dragenter", function(e) {
//       e.preventDefault();
//       var dropzone = getDropZone(dragging, $(e.target));
//       if (dropzone) {
//         dropzone.addClass("hovering");
//       }
//     })
//     .on("dragleave", function(e) {
//       $(e.target).removeClass("hovering");
//     })
//     .on("dragover", function(e) {
//       var dropzone = getDropZone(dragging, $(e.target));
//       if (dropzone) {
//         e.preventDefault();
//         return false;
//       }
//     })
//     .on("drop", function(e) {
//       e.stopPropagation();
//       e.preventDefault();
//       var dropzone = getDropZone(dragging, $(e.target));
//       if (dropzone) {
//         dropzone.removeClass("hovering");
//         if (dropzone.attr("id") !== "default") {
//           // defaultではない場合かつ何か入っていたら交換する
//           var dropped = dropzone.children(".ui.session.label").first();
//           if (dropped) {
//             dragging.parent().append(dropped);
//             dropzone.append(dragging);
//             return;
//           }
//         }
//         // それ以外の場合はそのままDropする
//         dropzone.append(dragging);
//       }
//       return false;
//     });
// });
