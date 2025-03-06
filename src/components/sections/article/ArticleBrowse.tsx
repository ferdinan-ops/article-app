'use client'

import he from 'he'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { HiChevronDown, HiOutlineCalendar, HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSearch
} from '@/components/organisms/Table'
import { Button, Loading } from '@/components/atoms'
import { DropDownButton, Pagination } from '@/components/molecules'
import { Form, FormField, FormItem } from '@/components/organisms/Form'

import useQueryParams from '@/hooks/useQueryParams'
import { useArticle, useDialog, useTab } from '@/store'

import { formatDate } from '@/lib/helper'
import { useDeleteArticle, useGetArticles } from '@/services/queries/article.query'

type SearchFormType = {
  search: string
}

const limits = [10, 15, 25]

export default function ArticleBrowse() {
  const forms = useForm<SearchFormType>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search', 'limit'])

  const { dialog } = useDialog()
  const changeTabActive = useTab((state) => state.changeTabActive)
  const { storeArticle, removeArticle } = useArticle((state) => ({
    storeArticle: state.storeArticle,
    removeArticle: state.removeArticle
  }))

  const {
    data: articles,
    isFetching,
    refetch
  } = useGetArticles({
    page: params.page ?? 1,
    search: params.search ?? '',
    limit: params.limit ?? 10
  })

  const { mutateAsync: deleteArticle } = useDeleteArticle()

  const onSubmit = (values: SearchFormType) => {
    if (!values.search) {
      deleteParam('search')
    } else {
      createParam({ key: 'search', value: values.search })
      refetch()
    }
  }

  const handleLimit = (limit: number) => {
    deleteParam('search')
    deleteParam('limit')
    deleteParam('page')
    createParam({ key: 'limit', value: limit.toString() })
  }

  const handleDelete = (articleId: number) => {
    void dialog({
      title: 'Delete Article',
      description: 'Are you sure you want to delete it? You can’t undo this action.',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteArticle(articleId)
    })
  }

  return (
    <React.Fragment>
      {isFetching && <Loading />}
      <div className="flex items-center justify-between">
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Type here to search" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex items-center gap-3">
          <DropDownButton
            lists={[{ label: '2025', onClick: () => {} }]}
            className="hidden items-center gap-2 md:flex"
            variant="secondary"
          >
            <HiOutlineCalendar className="text-primary" />
            <span>2025</span>
            <HiChevronDown />
          </DropDownButton>
          <Button 
            onClick={() => {
              removeArticle()
              changeTabActive(2)
            }}
          >
            <HiPlus className="text-lg" />
            <span className="text-xs font-semibold">Add</span>
          </Button>
        </div>
      </div>
      <Table className="mt-8">
        <TableHeader className="bg-[#EEF7EF]">
          <TableRow>
            <TableHead className="text-primary" position="center">
              No
            </TableHead>
            <TableHead className="text-primary" position="center">
              Date
            </TableHead>
            <TableHead className="text-primary" position="center">
              Title
            </TableHead>
            <TableHead className="text-primary" position="center">
              Content
            </TableHead>
            <TableHead className="text-primary" position="center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles?.data.articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            articles?.data.articles.map((article, index) => (
              <TableRow key={article.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{formatDate(article.created_at)}</TableCell>
                <TableCell className="capitalize">{article.title}</TableCell>
                <TableCell className="max-w-[400px]">{he.decode(he.decode(article.content))}</TableCell>
                <TableCell className="flex items-center gap-1" position="center">
                  <Button
                    className="rounded-full bg-[#CF8812] hover:bg-[#CF8812]/80"
                    size="icon"
                    onClick={() => {
                      storeArticle(article)
                      changeTabActive(2)
                    }}
                  >
                    <HiPencil className="text-lg" />
                  </Button>
                  <Button
                    className="rounded-full bg-[#FF1D1D] hover:bg-[#FF1D1D]/80"
                    size="icon"
                    onClick={() => handleDelete(article.id)}
                  >
                    <HiTrash className="text-lg" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="mt-3 flex flex-1 items-center justify-end gap-8 md:mt-8">
        <div className="hidden items-center gap-4 text-black md:flex">
          <span className="text-sm">Show</span>
          <DropDownButton
            lists={limits.map((limit) => ({
              label: limit.toString(),
              onClick: (label: string) => handleLimit(Number(label))
            }))}
            className="flex items-center gap-2"
            variant="secondary"
          >
            <span>{params.limit !== '' ? params.limit : '10'}</span>
            <HiChevronDown />
          </DropDownButton>
          <span className="text-sm">entries</span>
        </div>
        {articles &&
        articles?.data.page_info &&
        articles?.data.page_info?.total > (params.limit !== '' ? Number(params.limit) : 10) ? (
          <Pagination
            pageSize={params.limit !== '' ? Number(params.limit) : 10}
            totalCount={articles?.data.page_info.total as number}
            currentPage={params.page !== '' ? parseInt(params.page) : 1}
            onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </div>
    </React.Fragment>
  )
}
