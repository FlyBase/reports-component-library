import MultiTextInput from "../components/form-elements/MultiTextInput";

export default {
    component: MultiTextInput,
    title: 'MultiTextInput',
    tags: ['autodocs'],
};

export const Default = {
    args: {
        onChange: (items: string[]) => console.log(items)
    },
};
