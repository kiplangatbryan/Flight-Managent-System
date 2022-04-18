<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-white text-white">
      <div class="content">
        <div class="content-apk">
          <q-card-section>
            <div class="text-h6 row items-center">
              <q-btn dense flat icon="close" @click="$emit('toggle')">
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
              <div class="q-ml-md">Create a new Task Project</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro labore.
          </q-card-section>

          <q-stepper
            class="shadow-0"
            v-model="step"
            horizontal
            color="yellow"
            animated
          >
            <q-step
              :name="1"
              title="Name your task"
              icon="edit"
              :done="step > 1"
            >
              <div class="size-box q-mx-lg">
                <q-input
                  class="q-mb-lg q-mt-lg"
                  outlined
                  v-model="task_name"
                  label="Task name"
                  placeholder="creating *"
                  hint="task nickname"
                  dense
                />

                <q-input
                  class="q-mb-lg"
                  outlined
                  v-model="task_type"
                  label="Type of Task"
                  placeholder="coding, design"
                  hint="category"
                  dense
                />
              </div>

              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="add description" icon="insights" disable>
              <div class="q-py-md">Description</div>
              <q-editor v-model="editor" min-height="5rem" />

              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="add users" icon="people" disable>
              <div class="q-py-md">Description</div>
              <q-editor v-model="editor" min-height="5rem" />

              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="Set Timeline" icon="schedule" disable>
              Try out different ad text to see what brings in the most
              customers, and learn how to enhance your ads using features like
              ad extensions. If you run into any problems with your ads, find
              out how to tell if they're running and how to resolve approval
              issues.

              <q-stepper-navigation>
                <q-btn color="primary" label="Finish" />
                <q-btn
                  flat
                  @click="step = 2"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </div>
        <div class="side-rebble">
          <img src="../assets/process.svg" alt="" srcset="" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

export default {
  name: "create-task-modal",

  setup() {
    const store = useAppStore();

    const { bookingState } = storeToRefs(store);

    return {
      bookingState,
      position: "top",
      maximizedToggle: "",
      task_name: "",
      task_type: "",
      step: 1,
      editor: "",
    };
  },
};
</script>

<style lang="css" scoped>
.content {
  display: flex;
}

.content-apk {
  flex: 1 1 72%;
  padding: 3em 5em;
}
.size-box {
  max-width: 350px;
}
.side-rebble {
  flex: 1 1 25%;
  min-height: 100vh;
  background: #042442;
  position: relative;
}
.side-rebble img {
  height: 65vh;
  position: absolute;
  bottom: 10%;
  left: -18%;
}
</style>
