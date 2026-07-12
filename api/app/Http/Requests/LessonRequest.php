<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'content' => 'required|string|min:10',
            'order' => 'integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório.',
            'title.min' => 'O título precisa ter pelo menos 3 caracteres.',
            'content.required' => 'O conteúdo é obrigatório.',
            'content.min' => 'O conteúdo precisa ter pelo menos 10 caracteres.',
        ];
    }
}
