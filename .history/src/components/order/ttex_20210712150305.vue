    <van-tab v-for="(item, index) in title" :title="item.name" :key="index">
        <!-- 评价订单 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad(index)"
          :offset="100"
        >
          <div
            v-for="(item1, index1) in item.data"
            :key="index1"
            class="goodsBox flex a-i-fs"
          >
            <!-- 已评价 -->
            <div v-if="index === 0">
              <div v-if="item1" class="flex a-i-fs">
                <div @click="goDetail('/Details', item1.cid)">
                  <img
                    :src="item1.goods[0].image_path"
                    alt=""
                    class="goodImg"
                  />
                </div>
                <div>
                  <div>{{ item1.goods[0].name }}</div>

                  <div class="p-tb-10 ellipsis">详情： {{ item1.content }}</div>
                  <div
                    class="flex share gray"
                    @click.stop="
                      view('/ViewComment', item1.cid, item1.goods[0]._id)
                    "
                  >
                    <i class="iconfont icon-pingjia"></i>
                    <div class="pl-10">查看评价</div>
                  </div>
                </div>
              </div>

              <div v-else class="t-a-c p-10">暂无记录</div>
            </div>

            <!-- 未评价 -->
            <div v-if="index === 1">
              <div v-if="item" class="flex a-i-fs">
                <div @click="goDetail('/Details', item1.cid)">
                  <img :src="item1.image_path" alt="" class="goodImg" />
                </div>
                <div>
                  <div>{{ item1.name }}</div>

                  <div
                    class="flex share red"
                    @click="go('/PublishComment', item1)"
                  >
                    <i class="iconfont icon-pingjia"></i>
                    <div class="pl-10">评论晒单</div>
                  </div>
                </div>
              </div>
              <div v-else class="t-a-c p-10">暂无记录</div>
            </div>
          </div>
        </van-list>
      </van-tab>



        <van-tab :title="title[0].name">
        <!-- 已评价 -->
        <div v-if="title[0].data.length > 0">
          <!-- 上滑加载更多数据 -->
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
              :immediate-check="false"
              @refresh="onRefresh"
            >
              <div
                v-for="(item1, index1) in title[0].data"
                :key="index1"
                class="goodsBox flex a-i-fs"
              >
                <div @click="goDetail('/Details', item1.cid)">
                  <img
                    :src="item1.goods[0].image_path"
                    alt=""
                    class="goodImg"
                  />
                </div>
                <div>
                  <div>{{ item1.goods[0].name }}</div>

                  <div class="p-tb-10 ellipsis">详情： {{ item1.content }}</div>
                  <div
                    class="flex share gray"
                    @click.stop="
                      view('/ViewComment', item1.cid, item1.goods[0]._id)
                    "
                  >
                    <i class="iconfont icon-pingjia"></i>
                    <div class="pl-10">查看评价</div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else class="t-a-c p-10">暂无记录</div>
      </van-tab>
      <van-tab :title="title[1].name">
        <!-- 未评价 -->
        <div v-if="title[1].data.length > 0">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
              @refresh="onRefresh"
              :immediate-check="false"
            >
              <div
                v-for="(item1, index1) in title[1].data"
                :key="index1"
                class="goodsBox flex a-i-fs"
              >
                <div @click="goDetail('/Details', item1.cid)">
                  <img :src="item1.image_path" alt="" class="goodImg" />
                </div>
                <div>
                  <div>{{ item1.name }}</div>

                  <div
                    class="flex share red"
                    @click="go('/PublishComment', item1)"
                  >
                    <i class="iconfont icon-pingjia"></i>
                    <div class="pl-10">评论晒单</div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else class="t-a-c p-10">暂无记录</div>
      </van-tab>