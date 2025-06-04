import { Node, mergeAttributes } from '@tiptap/core';

export const Video = Node.create({
  name: 'video',

  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {},
      controls: { default: true },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ node }) => {
      const video = document.createElement('video');
      video.src = node.attrs.src;
      video.controls = true;
      video.style.width = '100%';
      video.style.borderRadius = '8px';
      return {
        dom: video,
      };
    };
  },
});
