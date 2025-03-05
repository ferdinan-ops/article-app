'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input, Textarea } from '@/components/atoms'
import { Form, FormField, FormItem, FormLabel } from '@/components/organisms/Form'

import { useArticle, useTab } from '@/store'
import { ArticlePayload } from '@/types/article.type'
import { useCreateArticle, useUpdateArticle } from '@/services/queries/article.query'

export default function ArticleForm() {
  const forms = useForm<ArticlePayload>()

  const changeTabActive = useTab((state) => state.changeTabActive)
  const { article, removeArticle } = useArticle((state) => ({
    article: state.article,
    removeArticle: state.removeArticle
  }))

  const { mutate: createArticle, isLoading: loadingCreate } = useCreateArticle()
  const { mutate: updateArticle, isLoading: loadingUpdate } = useUpdateArticle()

  React.useEffect(() => {
    if (article.id) {
      forms.setValue('title', article.title)
      forms.setValue('content', article.content)
    }
  }, [article, forms])

  const onSuccess = () => {
    forms.reset({
      title: '',
      content: ''
    })
    changeTabActive(1)
    removeArticle()
  }

  const onSubmit = (values: ArticlePayload) => {
    if (article.id) return updateArticle({ ...values, id: article.id }, { onSuccess })
    createArticle(values, { onSuccess })
  }

  return (
    <React.Fragment>
      <h1 className="border-b pb-4 text-xl font-semibold">{article.id ? `Edit #${article.id}` : 'Add'}</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          <FormField
            name="title"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <Input {...field} value={field.value ?? ''} className="w-full bg-[#F7F7F7] md:w-4/12" />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Content</FormLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  className="h-[140px] w-full bg-[#F7F7F7] md:h-[200px] md:w-10/12"
                />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button className="w-fit" loading={loadingCreate || loadingUpdate}>
              Save
            </Button>
            <Button className="w-fit" variant="outline" type="button" onClick={onSuccess}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  )
}
