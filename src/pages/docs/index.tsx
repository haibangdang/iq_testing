// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const DocsPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Stanford–Binet Intelligence Scales' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>Stanford–Binet Intelligence Scales:</Typography>
            <Typography sx={{ mb: 2 }}>
              Thang đo trí tuệ Stanford–Binet là một trong những công cụ đo lường trí tuệ đầu tiên và phổ biến nhất trên
              thế giới. Được phát triển từ thập kỷ 1910 bởi Lewis Terman tại Đại học Stanford, nó là phiên bản sửa đổi
              của bộ thang đo trí tuệ Binet-Simon, một công cụ đo lường trí tuệ được tạo ra ở Pháp. Mục tiêu chính của
              thang đo này là đo lường khả năng tư duy logic, khả năng giải quyết vấn đề, và khả năng học tập của cá
              nhân, nhằm đưa ra dự đoán về thành tích học tập trong tương lai. Thang đo Stanford–Binet đã trải qua nhiều
              phiên bản sửa đổi và hiện tại được sử dụng rộng rãi trong việc đánh giá trí tuệ của trẻ em và người lớn.
              Điểm đặc biệt của nó là khả năng xác định chỉ số trí tuệ (IQ) của một cá nhân, giúp xác định xem họ có
              đang hoạt động ở một mức trí tuệ bình thường hay có sự chệch lệch nào so với độ tuổi của họ.
            </Typography>
            <Typography sx={{ color: 'primary.main' }}></Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Raven’s Progressive Matrices' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>Raven’s Progressive Matrices:</Typography>
            <Typography sx={{ mb: 2 }}>
              Raven’s Progressive Matrices (RPM), được phát triển bởi John C. Raven vào năm 1936, được thiết kế nhằm đo
              lường khả năng suy luận không gian và tư duy logic không dựa vào khả năng ngôn ngữ hoặc kiến thức cụ thể
              trước đó của cá nhân. Điều này khiến RPM trở thành công cụ đo lường trí tuệ rất quan trọng, đặc biệt là
              trong những trường hợp không mong muốn bị ảnh hưởng bởi khả năng ngôn ngữ hoặc văn hóa. Bài test gồm một
              loạt các hình ảnh mà người làm bài cần tìm ra mẫu số tiếp theo dựa trên quy tắc hoặc mô hình được áp dụng.
              RPM không yêu cầu người làm bài phải đọc hoặc viết, làm cho nó trở thành công cụ đánh giá lý tưởng cho
              những người có khả năng ngôn ngữ hạn chế hoặc những người đến từ nền văn hóa đa dạng.
            </Typography>
            <Typography sx={{ color: 'primary.main' }}></Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Kaufman Assessment Battery for Children' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>Kaufman Assessment Battery for Children:</Typography>
            <Typography sx={{ mb: 2 }}>
              Khám phá "Kaufman Assessment Battery for Children" (KABC), một trong những công cụ đánh giá trí tuệ được
              công nhận rộng rãi dành cho trẻ em, chúng ta có thể thấy một hệ thống đánh giá toàn diện, đa chiều và khoa
              học. Được phát triển bởi Alan S. Kaufman và Nadeen L. Kaufman vào những năm 1980, KABC là một bộ test đánh
              giá trí tuệ độc đáo và mang tính cách mạng, với mục tiêu cung cấp một cái nhìn sâu sắc và toàn diện về khả
              năng học tập và tư duy của trẻ em.
            </Typography>
            <Typography sx={{ color: 'primary.main' }}></Typography>
          </CardContent>
        </Card>
      </Grid>

      {ability?.can('read', 'analytics') ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Wechsler Adult Intelligence Scale (WAIS)' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>Wechsler Adult Intelligence Scale (WAIS):</Typography>
              <Typography sx={{ mb: 2 }}>
                Wechsler Adult Intelligence Scale, thường được biết đến với tên gọi WAIS, là một thang đo trí tuệ phổ
                biến dành riêng cho người lớn và thanh thiếu niên. Được David Wechsler phát triển vào những năm 1950,
                WAIS hiện đã trải qua nhiều phiên bản và là một trong những công cụ đánh giá trí tuệ được tin cậy nhất.
                Một trong những đặc điểm nổi bật của WAIS là việc chia rõ ràng thành hai hạng mục: Kỹ năng Tư duy Verbal
                và Kỹ năng Thực hiện. Điều này giúp cho việc đánh giá trí tuệ trở nên cân đối và toàn diện hơn, không
                chỉ dựa vào khả năng ngôn ngữ mà còn xem xét khả năng giải quyết vấn đề, tư duy logic và kỹ năng không
                gian. Với WAIS, các chuyên gia có thể đưa ra một bức tranh rõ ràng về khả năng trí tuệ của một cá nhân,
                giúp họ xác định các điểm mạnh, điểm yếu và đề xuất những giải pháp hỗ trợ phù hợp.
              </Typography>

              {/* <Typography sx={{ color: 'error.main' }}>Bài viết này chỉ dành riêng cho 'admin'.</Typography> */}
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  )
}

DocsPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default DocsPage
