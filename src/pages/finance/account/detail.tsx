/** @title 详情 */
import { useEffect, useState } from 'react'
import { accountDetailDemo } from '@/actions/actions/demo'
import { accountDetail } from '@/actions/types/demo'
import { DetailBox, PageTitle, FooterButton } from '@/components/common'

export default function Detail(props: Project.IPageProps) {
  const [data, setData] = useState<accountDetail['response']['data']>()

  const getDetailData = async function () {
    const res = await accountDetailDemo({ id: props.location.query['id'] })
    if (res.success) {
      setData(res.data)
    }
  }

  useEffect(function () {
    getDetailData()
  }, [])

  return (
    <>
      <PageTitle title="详情" />
      <FooterButton showBack />
      <DetailBox
        title="账户基本信息"
        dataSource={[
          {
            label: '合伙伴/合资公司/代理商ID',
            value: data?.cId,
          },
          {
            label: '合伙伴/合资公司/代理商名称',
            value: data?.name,
          },
          {
            label: '账户金额',
            value: data?.amount,
          },
          {
            label: '创建时间',
            value: data?.createTime,
          },
          {
            label: '账户截图',
            direction: 'column',
            value: (
              <div>
                {(data?.images || []).map((item) => (
                  <img src={item} key={`${item}images@`} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </>
  )
}
